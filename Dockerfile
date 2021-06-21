FROM python:3.9

ENV PYTHONNUNBUFFERED 1

ENV CODIGO /home/problem_hub

RUN apt-get update

RUN mkdir $CODIGO

WORKDIR $CODIGO

COPY . $CODIGO

RUN python -m pip install -r requirements.txt

RUN python -m venv venv

RUN apt-get install -y nodejs npm

WORKDIR $CODIGO/frontend

RUN npm install

WORKDIR $CODIGO 

EXPOSE 8000

EXPOSE 8080

CMD python manage.py makemigrations && python manage.py migrate && python manage.py runserver 0.0.0.0:8080

