"""App entry point."""
"""Initialize Flask app."""
import os
from flask import Flask
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

import logging
logging.basicConfig()
logging.getLogger('sqlalchemy.engine').setLevel(logging.INFO)

db = SQLAlchemy()

def create_app():
    """Construct the core application."""
    app = Flask(__name__, instance_relative_config=False)
    app.config.from_object("config.Config")
    
    CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
    api = Api(app=app)

    from users.routes import create_authentication_routes
    from products.routes import create_product_routes
    
    create_product_routes(api=api)
    create_authentication_routes(api=api)

    db.init_app(app)
        
    return app
