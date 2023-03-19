from server import db
from users.models import User
from products.models import Products

def init_db(app):
    with app.app_context():
        db.create_all()
        print("Initialized the db")
