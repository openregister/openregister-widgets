from flask import (
    Blueprint,
    render_template,
    current_app
)

frontend = Blueprint('frontend', __name__, template_folder='templates')


@frontend.route('/')
def index():
    address_register = current_app.config['ADDRESS_REGISTER']
    country_register = current_app.config['COUNTRY_REGISTER']
    return render_template('index.html', country_register=country_register, address_register=address_register)
