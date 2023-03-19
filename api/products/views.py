from flask import Response
from flask_restful import Resource
from flask import request, make_response
from products.service import create_product, get_products
from utils.common import token_required

class CreateProductApi(Resource):
    @staticmethod
    @token_required
    def post(current_user) -> Response:
        """
        POST response method for creating product.

        :return: JSON object
        """
        input_data = request.get_json()
        response, status = create_product(request, input_data)
        return make_response(response, status)

class GetProductsListApi(Resource):
    @staticmethod
    @token_required
    def get(current_user) -> Response:
        response, status = get_products(request, current_user)
        return make_response(response, status)
    