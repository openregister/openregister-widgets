from flask import (
    Blueprint,
    render_template,
    current_app,
    request,
    redirect
)

frontend = Blueprint('frontend', __name__, template_folder='templates')


@frontend.route('/')
def index():
    address_register = current_app.config['ADDRESS_REGISTER']
    country_register = current_app.config['COUNTRY_REGISTER']
    return render_template('index.html', country_register=country_register, address_register=address_register)


@frontend.route('/address', methods=['POST'])
def address():
    uprn = request.form.getlist('address')[0]
    current_app.logger.info(uprn)
    address_register = current_app.config['ADDRESS_REGISTER']
    url = "%s/address/%s" % (address_register, uprn)
    return redirect(url)


@frontend.route('/country', methods=['POST'])
def country():
    country = request.form.getlist('country')[0]
    current_app.logger.info(country)
    country_register = current_app.config['COUNTRY_REGISTER']
    url = "%s/country/%s" % (country_register, country)
    return redirect(url)
