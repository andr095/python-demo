from flask_restful import Api
from products.views import CreateProductApi, GetProductsListApi

def create_product_routes(api: Api):
    """Adds resources to the api.
    :param api: Flask-RESTful Api Object
    """
    api.add_resource(CreateProductApi, "/product/")
    api.add_resource(GetProductsListApi, "/product/")