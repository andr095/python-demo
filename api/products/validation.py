from marshmallow import Schema, fields, validate

class CreateProductSchema(Schema):
    # the 'required' argument ensures the field exists
    name = fields.Str(required=True, validate=validate.Length(min=4))
    description = fields.Str(required=True, validate=validate.Length(min=4))
    price = fields.Integer(required=True)
    stock = fields.Integer(required=True)

class GetProductsSchema(Schema):
    order_by = fields.Str(required=False, validate=validate.OneOf(["id", "name", "description", "price", "stock"]))
    order_dir = fields.Str(required=False, validate=validate.OneOf(["asc", "desc"]))
    limit = fields.Str(required=False, validate=validate.Regexp('^[-+]?[0-9]+$'))
    offset = fields.Str(required=False, validate=validate.Regexp('^[-+]?[0-9]+$'))
    search = fields.Str(required=False)
