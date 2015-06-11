import os
from widgets.factory import create_app
app = create_app(os.environ['SETTINGS'])
