from flask import (
    Blueprint,
    render_template,
    current_app
)

import requests

frontend = Blueprint('frontend', __name__, template_folder='templates')


@frontend.route('/')
def index():
    return render_template('index.html')


@frontend.route('/country-picker')
def country_picker():
    country_register = current_app.config['COUNTRY_REGISTER']
    country_register_url = "%s/all.json" % country_register
    res = requests.get(country_register_url, headers={"Content-type": "application/json"})
    countries = res.json()
    current_app.logger.info(countries)
    return render_template('country_picker.html', countries=countries, country_register=country_register)



@frontend.route('/address-lookup')
def address_lookup():
    return render_template('address_lookup.html')
