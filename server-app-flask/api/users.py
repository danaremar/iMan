from flask import Flask, Blueprint, jsonify
import settings
from models.users import User
from database import engine

users_blueprint = Blueprint('users_blueprint', __name__)

@users_blueprint.route('/test', methods=['GET'])
def test():
    return "It works!"

@users_blueprint.route('/users')
def get_all_users():
    users = User.query
    return jsonify(users)