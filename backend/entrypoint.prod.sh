#!/bin/sh

# Start server
echo "Waiting for database to be ready..."
until nc -z -v -w30 $DB_HOST $DB_PORT
do
  echo "Waiting for database to be ready..."
  sleep 1
done
echo "Database is up and running"

echo "Installing Production Dependencies"
pip install -r requirements.prod.txt | grep -v 'already satisfied'

echo "Run Migrations"
python manage.py migrate --no-input

echo "Invalidating Cache"
python manage.py invalidate_cachalot

echo "Collecting Static Files"
python manage.py collectstatic --no-input

echo "Starting server"
gunicorn core.wsgi:application --bind 0.0.0.0:8000 --log-level=info
