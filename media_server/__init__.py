from flask import Flask,render_template,request,redirect,url_for
from flask_cors import CORS
import sys

app = Flask(__name__)
app.config.from_object('media_server.config')
CORS(app, support_credentials=True)

# connect('mongodb://localhost:27017/media-server')

import media_server.lib
# from media_server.lib import *
import media_server.views
