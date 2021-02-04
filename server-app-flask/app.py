import logging.config

import os
from flask import Flask, Blueprint, jsonify
import settings
from database import init_db

# blueprints -> "import" api files
from api.users import users_blueprint

app = Flask(__name__)

def configure_app(flask_app):
    flask_app.config['SERVER_NAME'] = settings.FLASK_SERVER_NAME
    flask_app.config['SQLALCHEMY_DATABASE_URI'] = settings.SQLALCHEMY_DATABASE_URI
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = settings.SQLALCHEMY_TRACK_MODIFICATIONS


def initialize_app(flask_app):
    configure_app(flask_app)
    init_db()

    # add all blueprint to app
    app.register_blueprint(users_blueprint)


def main():
    initialize_app(app)
    app.run(debug=settings.FLASK_DEBUG)


if __name__ == "__main__":
    main()