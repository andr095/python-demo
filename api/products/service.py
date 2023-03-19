from products.validation import (
    CreateProductSchema,
    GetProductsSchema
)
from utils.common import generate_response
from products.models import Products
from users.models import User
from utils.http_code import HTTP_200_OK, HTTP_201_CREATED, HTTP_400_BAD_REQUEST
from server import db
from sqlalchemy import desc, asc

def create_product(request, input_data):
    """
    It creates a new product

    :param request: The request object
    :param input_data: This is the data that is passed to the function
    :return: A response object
    """
    errors = CreateProductSchema().validate(input_data)
    if errors:
        return generate_response(message=errors)
    check_name_exist = Products.query.filter_by(
        name=input_data.get("name")
    ).first()
    check_name_exist = Products.query.filter_by(name=input_data.get("name")).first()
    if check_name_exist:
        return generate_response(
            message="Products name already exist", status=HTTP_400_BAD_REQUEST
        )

    new_product = Products(**input_data)
    db.session.add(new_product)
    db.session.commit()
    return generate_response(
        data=input_data, message="Product Created", status=HTTP_201_CREATED
    )

def get_products(request, current_user):
 
    errors = GetProductsSchema().validate(dict(request.args))
    if errors:
        return generate_response(message=errors)
    
    order_by = 'id'
    if request.args.get('order_by'): order_by = request.args.get('order_by')

    order = desc(order_by)
    if request.args.get('order_dir') == 'asc': order = asc(order_by)
    if request.args.get('order_dir') == 'desc': order = desc(order_by)

    has_search = request.args.get('search')
    search = Products.name.is_not(None)
    if (has_search): search = Products.name.like("%{}%".format(has_search))
    
    query = Products.query.filter(search).order_by(order).limit(request.args.get('limit') or 10).offset(request.args.get('offset') or 0)
    total =  Products.query.filter(search).count()
    
    payload = [row.as_dict() for row in query.all()]
    
    return generate_response(
        data={"payload": payload, "total": total}, message="Products List", status=HTTP_200_OK
    )
