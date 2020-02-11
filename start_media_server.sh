#!/bin/bash

#cd /home/pi/MediaServer/ && source bin/activate && uwsgi --ini media-server.ini 2>&1 >> wsgi.log & disown $!
# cd /home/homeuser/source/ads/MediaServer && conda activate env3.4 && uwsgi --ini media-server.ini 2>&1 >> wsgi.log & disown $!
# for home wifi
source /home/homeuser/miniconda2/etc/profile.d/conda.sh && cd /home/homeuser/source/ads/MediaServer && conda activate env3.4 && uwsgi --http-socket 192.168.1.152:3031 --ini media-server.ini 2>&1 >> wsgi.log & disown $!
# on socket 3031
# source /home/homeuser/miniconda2/etc/profile.d/conda.sh && cd /home/homeuser/source/ads/MediaServer && conda activate env3.4 && uwsgi --http-socket 127.0.0.1:3031 --ini media-server.ini 2>&1 >> wsgi.log & disown $!
# on default socket:
#source /home/homeuser/miniconda2/etc/profile.d/conda.sh && cd /home/homeuser/source/ads/MediaServer && conda activate env3.4 && uwsgi --ini media-server.ini 2>&1 >> wsgi.log & disown $!
