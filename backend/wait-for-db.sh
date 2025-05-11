#!/bin/sh

echo "Esperando a que la base de datos esté disponible..."

while ! nc -z "$DB_HOST" "$DB_PORT"; do
  sleep 1
done

echo "Base de datos disponible. Iniciando Django..."

python manage.py migrate
python manage.py runserver 0.0.0.0:8000
