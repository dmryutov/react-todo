set -e

echo "Testing Django..."
cd ./backend
pip install -r requirements.txt
python manage.py test
