from flask import Flask, Blueprint, jsonify, request
import settings
from models.users import User
from database import session
import json
import hashlib
import datetime

users_blueprint = Blueprint('users_blueprint', __name__)

@users_blueprint.route('/test', methods=['GET'])
def test():
    return "It works!"


@users_blueprint.route('/users', methods=['GET'])
def get_all_users():
    result = []
    users = session.query(User).filter(User.active==True).all()
    for user in users:
        result.append(User.json_only_user(user))
    return json.dumps(result), 200, {'Content-Type': 'application/json'}


@users_blueprint.route("/sign-up", methods=['POST'])
def sign_up_an_user():
    user_dict = request.json
    user = User(**user_dict)
    user.creation_date = datetime.datetime.now()
    user.last_connection = datetime.datetime.now()
    user.delete_date = None
    user.active = True
    session.add(user)
    session.commit()
    return "User registered", 201, {'Content-Type': 'application/json'}

@users_blueprint.route("/login", methods=['POST','GET'])
def login():
    return 200




