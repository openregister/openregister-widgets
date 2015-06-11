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
    country_register = "%s/all.json" % current_app.config['COUNTRY_REGISTER']
    res = requests.get(country_register, headers={"Content-type": "application/json"})
    countries = res.json()
    current_app.logger.info(countries)
    return render_template('country_picker.html', countries=countries)
