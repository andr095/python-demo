from flask_restful import Api
from users.views import LoginApi, SignUpApi

def create_authentication_routes(api: Api):
    """Adds resources to the api.
    :param api: Flask-RESTful Api Object
    """
    api.add_resource(SignUpApi, "/auth/register/")
    api.add_resource(LoginApi, "/auth/login/")
