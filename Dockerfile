# ffmpeg for ffprobe query metadata
# FROM jrottenberg/ffmpeg:4.1-scratch
FROM jrottenberg/ffmpeg:4.1-ubuntu AS ffmpeg

# mongo for database - run this in another container
#FROM mongo:3.6-xenial AS mongo

# LAST FROM is the BASE IMAGE
# uwsgi flask and nginx
FROM tiangolo/uwsgi-nginx-flask:python3.8

# install binaries from ffmpeg image
#COPY --from=ffmpeg / /
ENV LD_LIBRARY_PATH=/usr/local/lib
COPY --from=ffmpeg /usr/local /usr/local/

# install exiftool for gif file metadata
RUN apt-get update && apt-get install -y libimage-exiftool-perl vim

COPY ./requirements.txt /app
RUN pip install -r requirements.txt

COPY ./media-server-docker.ini /app/uwsgi.ini
COPY ./media_server /app/media_server
COPY ./setup.py /app
COPY ./wsgi.py /app
COPY ./startup.sh /app

# update directory links
# this fails if local copy of media_server dir has links to /var/www/drive !
# RUN ln -s /var/www/drive/kmz media_server/kmz && \
# 		ln -s /var/www/drive/movies media_server/movies && \
# 		ln -s /var/www/drive/gif media_server/gif

# nginx server configuration
COPY ./media-server.conf /etc/nginx/conf.d/media-server.conf

# serve static pages with nginx
#ENV STATIC_INDEX 1
#COPY ./static /app/static

# change default port
# don't listen on port 80, it will conflict with other server running there
ENV LISTEN_PORT 8400

# tell nginx to run virtual host called media-server
ENV MEDIASERVER media-server

# run mod_wsgi and nginx at this level
ENV NICE_LEVEL 10

# only startup uwsgi - no static nginx
#CMD [ "uwsgi", "--http-socket", "127.0.0.1:3031" ]
# startup nginx, and flask uwsgi
CMD ["/app/startup.sh"]
