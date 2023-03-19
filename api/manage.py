from server import create_app
import sys
from flask.cli import FlaskGroup

app = create_app()
cli = FlaskGroup(create_app=create_app)

if __name__ == "__main__":
    from db_init import init_db
    init_db(app)
    cli()