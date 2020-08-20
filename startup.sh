#!/usr/bin/env bash
#export FLASK_APP="media_server/__init__.py"
#export FLASK_DEBUG=1
#uwsgi --ini uwsgi.ini
#flask run &

echo "startup.sh"

echo "creating links"
ln -s /var/www/drive/kmz media_server/kmz
ln -s /var/www/drive/movies media_server/movies
ln -s /var/www/drive/gif media_server/gif

echo "starting nginx"
service nginx start &

echo "starting wsgi"
uwsgi --http-socket 127.0.0.1:3031
