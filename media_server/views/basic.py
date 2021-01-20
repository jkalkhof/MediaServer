from flask import Flask,render_template,request,url_for,redirect,jsonify,flash,abort, send_from_directory,send_file,Response
from flask_cors import CORS
from flask_cors import cross_origin
from werkzeug import secure_filename
import os
from os import path,makedirs,rename
from uuid import uuid4

from bson import Binary, Code, json_util
from bson.json_util import dumps

from media_server import app
from media_server.lib import *

import json

import subprocess

@app.route('/')
def home():
	return render_template('views/home.html', title='Media')

@app.route('/admin')
def admin():
	return render_template(
		'views/admin.html',
		title='Admin'
	)

@app.route('/remove_file/<folder>/<filename>',methods=['POST'])
def remove_file(folder=None,filename=None):
	if folder == 'movies':
		if filename is not None:
			print('remove_file: filename:',filename)
			remove_movies('media_server/movies',filename)
			return "success"
	elif folder == 'kmz':
		if filename is not None:
			print('remove_file: filename:',filename)
			remove_kmz('media_server/kmz',filename)
			return "success"
	elif folder == 'gif':
		if filename is not None:
			print('remove_file: filename:',filename)
			remove_gif('media_server/gif',filename)
			return "success"

	return "error"

@app.route('/rescan_dir/<folder>',methods=['POST'])
@app.route('/rescan_dir/<folder>/<filename>',methods=['POST'])
def rescan_dir(folder=None,filename=None):
	if folder == 'movies':
		if filename is not None:
			print('rescan_dir: filename:',filename)
			update_movies('media_server/movies',filename)
		else:
			# scans directory from /home/wrfuser/source/ads/MediaServer/media_server/movies
			update_movies('media_server/movies')
		return "success"
	elif folder == 'kmz':
		update_kmz('media_server/kmz')
		return "success"
	elif folder == 'gif':
		update_gif('media_server/gif')
		return "success"
	elif folder == 'png':
		update_png('media_server/png')
		return "success"
	elif folder == 'tv':
		update_tv('media_server/tv')
		return "success"
	elif folder == 'books':
		update_books('media_server/allitebooks')
		return "success"
	return "error"

@app.route('/search/<collection>/',methods=['POST'])
@app.route('/search/<collection>/<search_string>',methods=['POST'])
def search(collection=None,search_string=None):
	# need to be able to search for metadata tags:
	# ensemble
	# boundary_condition
	# init_date
	# plot_group
	# plot
	ensemble = request.args.get('ensemble', default = '001', type = str)
	boundary_condition = request.args.get('boundary_condition', default = 'gfs', type = str)
	init_date = request.args.get('init_date', default = None, type = str)
	plot_group = request.args.get('plot_group', default = None, type = str)
	plot = request.args.get('plot', default = None, type = str)

	print('basic: search: collection:', collection)
	print('basic: search_string:',search_string)

	# init_date uses iso8601 for date/time example:"2019-11-14T00:00:00"
	print('basic: search: ensemble:', ensemble)
	print('basic: search: boundary_condition:', boundary_condition)
	print('basic: search: init_date:', init_date)
	print('basic: search: plot_group:', plot_group)
	print('basic: search: plot:', plot)


	if collection is not None:
		if ((ensemble is not None) and
			(boundary_condition is not None) and
			(init_date is not None) and
			(plot_group is not None) and
			(plot is not None)):

			listData = []
			if collection == 'movies':
				listData = search_db_movies_extended(ensemble=ensemble,\
					boundary_condition=boundary_condition,\
					init_date=init_date,\
					plot_group=plot_group,\
					plot=plot)
			elif collection == 'kmz':
				listData = search_db_kmz_extended(ensemble=ensemble,\
					boundary_condition=boundary_condition,\
					init_date=init_date,\
					plot_group=plot_group,\
					plot=plot)
			elif collection == 'gif':
				listData = search_db_gif_extended(ensemble=ensemble,\
					boundary_condition=boundary_condition,\
					init_date=init_date,\
					plot_group=plot_group,\
					plot=plot)

			# https://stackoverflow.com/questions/11875770/how-to-overcome-datetime-datetime-not-json-serializable
			response = jsonify(listData)
			response.headers.add('Access-Control-Allow-Origin', '*')
			return response

		else:
			return dumps(search_db(collection=collection,search_string=search_string))
	else:
		return dumps({"Error":""})
