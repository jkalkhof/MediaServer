#!/bin/bash

# for webserver media-server.atmosdatasolutions.com
source /home/wrfuser/miniconda3/etc/profile.d/conda.sh && cd /home/wrfuser/source/ads/MediaServer && conda activate env3.6 && uwsgi --http-socket 70.164.1.196:3031 --ini media-server.ini 2>&1 >> wsgi.log & disown $!
