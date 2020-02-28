#!/bin/bash

# dell g7 laptop
source /home/homeuser/miniconda3/etc/profile.d/conda.sh && cd /home/homeuser/source/ads/MediaServer && conda activate env3.6 && LD_LIBRARY_PATH=/home/homeuser/miniconda3/lib/ uwsgi --http-socket 127.0.0.1:3031 --ini media-server-g7.ini 2>&1 >> wsgi.log & disown $!
