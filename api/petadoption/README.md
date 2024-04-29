## Install virtualenv if you haven't already
```pip install virtualenv```

## Create a virtual environment
```virtualenv venv```

## Activate the virtual environment
### On Windows
```venv\Scripts\activate```

### On macOS/Linux
```source venv/bin/activate```

## Install Dependencies
```pip install -r requirements.txt```

## Database Setup 
```python manage.py makemigrations```

```python manage.py migrate```

## Run the Development Server
```python manage.py runserver```

You can now access your Django project at http://localhost:8000
