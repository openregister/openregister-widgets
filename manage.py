#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os
from flask.ext.script import Shell, Server, Manager

from widgets import app
import logging

app.debug = True
logging.basicConfig(level=logging.DEBUG)

port = os.environ.get('PORT', 8000)

manager = Manager(app)
manager.add_command('server', Server(host="0.0.0.0", port=port))

if __name__ == '__main__':
    manager.run()
