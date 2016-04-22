# -*- coding: utf-8 -*-
import os

class Config(object):
    APP_ROOT = os.path.abspath(os.path.dirname(__file__))
    PROJECT_ROOT = os.path.abspath(os.path.join(APP_ROOT, os.pardir))
    SECRET_KEY = os.environ.get('SECRET_KEY')

    COUNTRY_REGISTER = os.environ.get('COUNTRY_REGISTER', 'https://country.register.gov.uk')
    ADDRESS_REGISTER = os.environ.get('ADDRESS_REGISTER', 'http://address.alpha.openregister.org')
    ADDRESS_SEARCH = os.environ.get('ADDRESS_SEARCH', 'http://address-search.openregister.org/2013-01-01/search')

class DevelopmentConfig(Config):
    DEBUG = True
    WTF_CSRF_ENABLED = False
    SECRET_KEY = os.environ.get('local-dev-not-secret')
