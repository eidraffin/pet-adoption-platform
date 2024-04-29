# Install virtualenv if you haven't already
pip install virtualenv

# Create a virtual environment
virtualenv venv

# Activate the virtual environment
# On Windows
venv\Scripts\activate
# On macOS/Linux
source venv/bin/activate


pip install -r requirements.txt

python manage.py makemigrations
python manage.py migrate

python manage.py runserver

#You can now access your Django project at http://localhost:8000
