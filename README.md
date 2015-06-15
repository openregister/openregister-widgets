Openregister Widgets
===============================

Prerequisites
-------------
* python 3
* virtualenv and virtualenvwrapper


Quickstart
----------

Then run the following commands to bootstrap your environment.

```
mkvirtualenv --python=/path/to/python3 widgets
```

Install python requirements.
```
pip install -r requirements/dev.txt
```

Run the app
```
./run.sh
```

Deployment
----------

When deployed to Heroku, make sure the ``SETTINGS`` environment variable is set to ``config.Config``.
