#!/usr/bin/env bash
#export FLASK_APP="media_server/__init__.py"
#export FLASK_DEBUG=1
#uwsgi --ini uwsgi.ini
#flask run &

echo "startup.sh"
service nginx start &
uwsgi --http-socket 127.0.0.1:3031
