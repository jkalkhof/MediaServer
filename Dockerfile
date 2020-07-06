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
RUN apt-get update && apt-get install -y libimage-exiftool-perl

COPY ./media-server-docker.ini /app/uwsgi.ini
COPY ./media_server /app/media_server
COPY ./setup.py /app
COPY ./wsgi.py /app
COPY ./startup.sh /app
COPY ./requirements.txt /app

RUN pip install -r requirements.txt

# nginx server configuration
COPY ./media-server.conf /etc/nginx/conf.d/media-server.conf

# serve static pages with nginx
ENV STATIC_INDEX 1
COPY ./static /app/static

# only startup uwsgi - no static nginx
#CMD [ "uwsgi", "--http-socket", "127.0.0.1:3031" ]
# startup nginx, and flask uwsgi
CMD ["/app/startup.sh"]
