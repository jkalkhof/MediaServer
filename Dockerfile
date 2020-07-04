FROM mongo:3.6-xenial
#FROM tiangolo/uwsgi-nginx:python3.8
FROM tiangolo/uwsgi-nginx-flask:python3.8

COPY ./media-server-docker.ini /app/uwsgi.ini
COPY ./media_server /app/media_server
COPY ./setup.py /app
COPY ./wsgi.py /app
COPY ./startup.sh /app
COPY ./requirements.txt /app

RUN pip install -r requirements.txt

# how do I start this stupid thing?
# CMD [ "/app/startup.sh" ]
# CMD [ "uwsgi" ]
#cmd [ "pip", "install", "-e", "."]
CMD [ "uwsgi", "--http-socket", "127.0.0.1:3031" ]
