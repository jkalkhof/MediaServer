#!/bin/bash

# for home hp-desktop
source /home/homeuser/miniconda2/etc/profile.d/conda.sh && cd /home/homeuser/source/ads/MediaServer && conda activate env3.4 && uwsgi --http-socket 127.0.0.1:3031 --ini media-server-g7.ini 2>&1 >> wsgi.log & disown $!
