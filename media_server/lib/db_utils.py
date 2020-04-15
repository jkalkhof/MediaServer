import sys
import re
from pymongo import MongoClient, ASCENDING
from pymodm import connect
from bson import Binary, Code
from bson.json_util import dumps

from media_server.lib.file_utils import *
from media_server.lib.models import *

import ffmpy, subprocess, json
from datetime import *

def get_results(Object=None,query_obj=None,sort=None):
	if Object is not None and query_obj is not None:
		results = Object.objects.raw(query_obj).order_by(sort)
		json_results = []
		for item in results:
			# get_results: <Movie object>
			# print('get_results:',item)

			# convert to SON - the Serialized Ocument Notation.
			# https://api.mongodb.com/python/current/api/bson/son.html
			# get_results:(to_son) SON([('path', 'media_server/movies/51702702.mp4'), ('file', '51702702.mp4'), ('name', '51702702'), ('_id', '51702702.mp4'), ('ensemble', '001'), ('boundary_condition', 'gfs'), ('init_date', datetime.datetime(2019, 11, 14, 0, 0)), ('plot', 'Incoming Short-wave Rad/10m Wind'), ('plot_group', 'Near Surface Plots'), ('_cls', 'media_server.lib.models.Movie')])
			item_son = item.to_son()
			# print('get_results:(to_son)',item_son)

			date_time_obj = item_son['init_date']
			output_format="%Y-%m-%dT%H:%M:%S"
			dateStr = date_time_obj.strftime(output_format)
			item_son['init_date'] = dateStr

			print('get_results:(to_son)',item_son)

			# print('get_results:(to_son.to_dict)',item.to_son().to_dict())
			json_results.append(dumps(item_son))

			# avoid double encoding json strings
			# https://api.mongodb.com/python/current/api/bson/son.html
			# json_results.append(item.to_son().to_dict())
		return json_results
	else:
		print("get_results called without an Object or query")
		return None

def get_results_no_jsonencode(Object=None,query_obj=None,sort=None):
	# Object should be: media_server.lib.models.Movie
	if Object is not None and query_obj is not None:
		# print("get_results_no_jsonencode: Object:",Object)
		# print("get_results_no_jsonencode: query_obj:",query_obj)

		results = Object.objects.raw(query_obj).order_by(sort)

		# print("get_results_no_jsonencode: results:",results)

		json_results = []
		for item in results:
			# avoid double encoding json strings
			# https://api.mongodb.com/python/current/api/bson/son.html

			# get_results_no_jsonencode: results: item: <Movie object>
			# print("get_results_no_jsonencode: results: item:",item)

			item_son = item.to_son()

			date_time_obj = item_son['init_date']
			output_format="%Y-%m-%dT%H:%M:%S"
			dateStr = date_time_obj.strftime(output_format)
			item_son['init_date'] = dateStr

			print('get_results_no_jsonencode:(to_son)',item_son)

			json_results.append(item_son.to_dict())
		# print("get_results_no_jsonencode:",json_results)
		return json_results
	else:
		print("get_results called without an Object or query")
		return None

def get_all(Object=None,sort=None):
	if Object is not None:
		results = Object.objects.all().order_by(sort)
		json_results = []
		for item in results:

			item_son = item.to_son()

			date_time_obj = item_son['init_date']
			output_format="%Y-%m-%dT%H:%M:%S"
			dateStr = date_time_obj.strftime(output_format)
			item_son['init_date'] = dateStr

			print('get_all:(to_son)',item_son)

			json_results.append(dumps(item_son))
		return json_results
	else:
		print("get_all was called without an Object")
		return None

def search_db_movies_extended(ensemble=None,boundary_condition=None,init_date=None,plot_group=None,plot=None):
	print('search_db_movies_extended: ensemble:',ensemble)
	print('search_db_movies_extended: boundary_condition:',boundary_condition)
	print('search_db_movies_extended: init_date:',init_date)
	print('search_db_movies_extended: plot_group:',plot_group)
	print('search_db_movies_extended: plot:',plot)

	# convert init_date from iso8601 to datetime for query
	# input_format="%Y-%m-%dT%H:%M:%S.%fZ"
	input_format="%Y-%m-%dT%H:%M:%S"
	date_time_obj = datetime.strptime(init_date, input_format)

	# {"plot":plot},\

	# STRATEGY - build up the query in parts, testing as we go...

	return get_results_no_jsonencode(Movie, {"$and": [\
		{"ensemble" : ensemble},\
		{"boundary_condition":boundary_condition},\
		{"init_date":date_time_obj},\
		{"plot_group":plot_group},\
		{"plot":plot},\
		]},[('plot',ASCENDING)])

	# {"plot":{'$regex':plot}},\

def search_db(collection=None, search_string=None):
	if search_string is not None:
		query = re.compile(search_string, re.IGNORECASE)

		if collection == 'movies':
			# return get_results(Movie, {"name" : query},[('name',ASCENDING)])
			return get_results(Movie, {"plot" : query},[('plot',ASCENDING)])
		elif collection == 'tv':
			return get_results(TV, {"name" : query},[('series',ASCENDING)])
		elif collection == 'books':
			return get_results(Book, {"name" : query},[('name',ASCENDING)])
		else:
			print("Invalid Collection: " + collection)
			return "Invalid Collection: " + collection
	else:
		if collection == 'movies':
			return get_all(Movie,[('name',ASCENDING)])
		elif collection == 'tv':
			return get_all(TV,[('series',ASCENDING)])
		elif collection == 'books':
			return get_all(Book,[('name',ASCENDING)])
		else:
			print("Invalid Collection: " + collection)
			return "Invalid Collection: " + collection

def update_books(file_path=None):
	files_list = rescan_base_dir(file_path)

	for item in files_list:
		Book(
			name = item['name'],
			path = item['path'],
			file = item['file'],
			file_id = item['file']
		).save()
	return "success"

def remove_movies(file_path=None,filename=None):
	print ('db_utils: remove_movies')

	if (not (filename is None)):
			Movie(
				file = filename,
				# file_id is primary key!
				file_id = filename,
			).delete()

	return "success"

def update_movies(file_path=None,filename=None):
	print ('db_utils: update_movies')

	files_list = rescan_base_dir(file_path,filename)

	# check video files for metadata using ffprobe
	for item in files_list:
		print('file:',item)

		# TODO: use ffmpeg to extract metadata from each file for database
		ffprobe = ffmpy.FFprobe(global_options="-show_format -of json", inputs={item['path'] : None})
		print("ffprobe.cmd:", ffprobe.cmd)  # printout the resulting ffprobe shell command
		stdout, stderr = ffprobe.run(stderr=subprocess.PIPE, stdout=subprocess.PIPE)
		# std* is byte sequence, but json in Python 3.5.2 requires str
		ff0string = str(stdout,'utf-8')

		ffinfo = json.loads(ff0string)
		# print(json.dumps(ffinfo, indent=4)) # pretty print

		metadataEnsemble = None
		metadataBC = None
		metadataInit = None
		metadataPlot = None
		metadataPlotGroup = None
		initDTObj = None

		if ("ensemble" in ffinfo["format"]["tags"]):
			# print("ADS ensemble: ", ffinfo["format"]["tags"]["ensemble"])
			metadataEnsemble = ffinfo["format"]["tags"]["ensemble"]
		if ("boundary_condition" in ffinfo["format"]["tags"]):
			# print("ADS boundary_condition: ", ffinfo["format"]["tags"]["boundary_condition"])
			metadataBC = ffinfo["format"]["tags"]["boundary_condition"]
		if ("init" in ffinfo["format"]["tags"]):
			# print("ADS init: ", ffinfo["format"]["tags"]["init"])
			metadataInit = ffinfo["format"]["tags"]["init"]
			# initDTObj = datetime.strptime(metadataInit, "%Y-%m-%dT%H:%M:%S%z")
			initDTObj = datetime.strptime(metadataInit, "%Y-%m-%dT%H:%M:%S")
		if ("plot" in ffinfo["format"]["tags"]):
			# print("ADS plot: ", ffinfo["format"]["tags"]["plot"])
			metadataPlot = ffinfo["format"]["tags"]["plot"]
		if ("plot_group" in ffinfo["format"]["tags"]):
			# print("ADS plot_group: ", ffinfo["format"]["tags"]["plot_group"])
			metadataPlotGroup = ffinfo["format"]["tags"]["plot_group"]

		print("ADS ensemble: ", metadataEnsemble)
		print("ADS boundary_condition: ", metadataBC)
		print("ADS init: ", metadataInit)
		print("ADS plot: ", metadataPlot)
		print("ADS plot_group: ", metadataPlotGroup)

		if ((not (metadataEnsemble is None)) and \
			(not (metadataBC is None)) and \
			(not (metadataInit is None)) and \
			(not (metadataPlot is None)) and \
			(not (metadataPlotGroup is None))):

			print('saving Movie to mongodb')
			Movie(
				name = item['name'],
				path = item['path'],
				file = item['file'],
				# file_id is primary key!
				file_id = item['file'],
				# fields for AtmosphericDataSolutions weather videos
				ensemble = metadataEnsemble,
				boundary_condition = metadataBC,
				init_date = initDTObj,
				plot = metadataPlot,
				plot_group = metadataPlotGroup
			).save()
		else:
			print('skipping movie')

		# Movie(
		# 	name = item['name'],
		# 	path = item['path'],
		# 	file = item['file'],
		# 	# file_id is primary key!
		# 	file_id = item['file']
		# ).save()

	return "success"

def update_tv(file_path=None):
	files_list = rescan_base_dir(file_path)

	for item in files_list:
		details = item['path'].split('/')[-3:]
		TV(
			path    = item['path'],
			file    = item['file'],
			name    = item['name'],
			series  = details[0],
			season  = details[1],
			episode = details[2],
			file_id = item['file']
		).save()
	return "success"
