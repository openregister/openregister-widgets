from flask import (
    Blueprint,
    Response,
    render_template,
    current_app,
    request,
    redirect,
    jsonify
)

import requests

frontend = Blueprint('frontend', __name__, template_folder='templates')

headers = {'Content-type': 'application/json'}

@frontend.route('/')
def index():
    address_register = current_app.config['ADDRESS_REGISTER']
    country_register = current_app.config['COUNTRY_REGISTER']
    return render_template('index.html', country_register=country_register, address_register=address_register)

@frontend.route('/address-search')
def search():
    return Response(requests.get(current_app.config['ADDRESS_SEARCH'], params=request.args).content,
                    mimetype='application/json')

@frontend.route('/country', methods=['POST'])
def country():
    country = request.form.getlist('country')[0]
    current_app.logger.info(country)
    country_register = current_app.config['COUNTRY_REGISTER']
    url = "%s/country/%s" % (country_register, country)
    return redirect(url)


@frontend.route('/suggest-address')
def suggest_address():
    return render_template('suggest_address.html')


@frontend.route('/countries.json')
def countries():
    country_register = current_app.config['COUNTRY_REGISTER']
    url = "%s/records.json?page-size=300" % country_register
    resp = requests.get(url, headers=headers)
    countriesJson = resp.json()
    countries = []
    for key in countriesJson:
        countries.append(countriesJson[key])

    countries = sorted(countries, key=lambda country: country['name'])
    return jsonify({'entries': countries})
