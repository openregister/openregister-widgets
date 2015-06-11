from flask import (
    Blueprint,
    render_template,
    current_app
)

import requests

frontend = Blueprint('frontend', __name__, template_folder='templates')


@frontend.route('/')
def index():
    address_register = current_app.config['ADDRESS_REGISTER']
    country_register = current_app.config['COUNTRY_REGISTER']
    countries = _get_countries(country_register)
    return render_template('index.html', countries=countries, country_register=country_register, address_register=address_register)


@frontend.route('/country-picker')
def country_picker():
    country_register = current_app.config['COUNTRY_REGISTER']
    countries = _get_countries(country_register)
    return render_template('country_picker.html', countries=countries, country_register=country_register)


@frontend.route('/address-lookup')
def address_lookup():
    address_register = current_app.config['ADDRESS_REGISTER']
    return render_template('address_lookup.html', address_register=address_register)


def _get_countries(country_register):
    country_register_url = '%s/all.json' % country_register
    res = requests.get(country_register_url, headers={'Content-type': 'application/json'})
    countries_json = res.json()
    countries = [country['entry'] for country in countries_json]
    countries.sort(key=lambda entry: entry['country'])
    return countries
