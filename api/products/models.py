from server import db
import operator
from sqlalchemy.orm.collections import MappedCollection, collection

class KeyedListCollection(MappedCollection):

   def __init__(self, key):
      super(KeyedListCollection, self).__init__(operator.attrgetter(key))
    
   @collection.internally_instrumented
   def __setitem__(self, key, value, _sa_initiator=None):
      if not super(KeyedListCollection, self).get(key):
         super(KeyedListCollection, self).__setitem__(key, [], _sa_initiator)
      super(KeyedListCollection, self).__getitem__(key).append(value)

# user_select_product = db.Table('user_select_product',
#    db.Column('product_id',db.Integer, db.ForeignKey('products.id')),
#    db.Column('user_id', db.Integer, db.ForeignKey('users.id')),
#    db.PrimaryKeyConstraint('product_id', 'user_id')
# )

class Products(db.Model):
   id = db.Column(db.Integer, primary_key=True)
   name = db.Column(db.String(50), unique=True, nullable=False)
   description = db.Column(db.String(200), nullable=False)
   price = db.Column(db.Integer, nullable=False)
   stock = db.Column(db.Integer, nullable=False)
   # users = db.relationship('User', collection_class=lambda: KeyedListCollection('id'), secondary=user_select_product, backref='users_products')
   def as_dict(self):
      return {c.name: getattr(self, c.name) for c in self.__table__.columns}
   
   