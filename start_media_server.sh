#!/bin/bash

#cd /home/pi/MediaServer/ && source bin/activate && uwsgi --ini media-server.ini 2>&1 >> wsgi.log & disown $!
# cd /home/homeuser/source/ads/MediaServer && conda activate env3.4 && uwsgi --ini media-server.ini 2>&1 >> wsgi.log & disown $!
# for webserver media-server.atmosdatasolutions.com
#source /home/wrfuser/miniconda3/etc/profile.d/conda.sh && cd /home/wrfuser/source/ads/MediaServer && conda activate env3.6 && uwsgi --http-socket 70.164.1.196:3031 --ini media-server.ini 2>&1 >> wsgi.log & disown $!
# dell g7 laptop
source /home/homeuser/miniconda3/etc/profile.d/conda.sh && cd /home/homeuser/source/ads/MediaServer && conda activate env3.6 && LD_LIBRARY_PATH=/home/homeuser/miniconda3/lib/ uwsgi --http-socket 127.0.0.1:3031 --ini media-server-g7.ini 2>&1 >> wsgi.log & disown $!
# for home wifi
#source /home/homeuser/miniconda2/etc/profile.d/conda.sh && cd /home/homeuser/source/ads/MediaServer && conda activate env3.4 && uwsgi --http-socket 192.168.1.156:3031 --ini media-server.ini 2>&1 >> wsgi.log & disown $!
# on socket 3031
#source /home/homeuser/miniconda2/etc/profile.d/conda.sh && cd /home/homeuser/source/ads/MediaServer && conda activate env3.4 && uwsgi --http-socket 127.0.0.1:3031 --ini media-server.ini 2>&1 >> wsgi.log & disown $!
# on default socket:
#source /home/homeuser/miniconda2/etc/profile.d/conda.sh && cd /home/homeuser/source/ads/MediaServer && conda activate env3.4 && uwsgi --ini media-server.ini 2>&1 >> wsgi.log & disown $!
