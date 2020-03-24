# Mass Tranist Advisor

First, clone the repository.

git clone https://github.com/anaconda0905/Community_Engagement_Portal.git

Install the requirements.
pip install -r requirements.txt

create the database:
python manage.py migrate
python manage.py loaddata boards.json

Finally run the development server
python manage.py runserver 0.0.0.0:8000
