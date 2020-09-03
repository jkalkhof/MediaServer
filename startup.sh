#!/usr/bin/env bash
#export FLASK_APP="media_server/__init__.py"
#export FLASK_DEBUG=1
#uwsgi --ini uwsgi.ini
#flask run &

echo "startup.sh"

# nginx server configuration
echo "update server_name in nginx configuration"
sed -i -e 's/server_name media-server;/server_name '"$MEDIASERVER"';/' /etc/nginx/conf.d/media-server.conf

echo "creating links"
ln -s /var/www/drive/kmz media_server/kmz
ln -s /var/www/drive/movies media_server/movies
ln -s /var/www/drive/gif media_server/gif

echo "fix permissions on directories"
chown -R root /var/www/drive
chmod 755 /var/www/drive
chmod 755 /var/www/drive/kmz
chmod 755 /var/www/drive/gif
chmod 755 /var/www/drive/movies

echo "starting nginx"
nice -n $NICE_LEVEL service nginx start &

echo "starting wsgi"
nice -n $NICE_LEVEL uwsgi --http-socket 127.0.0.1:3031
