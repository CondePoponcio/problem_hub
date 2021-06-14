FROM python:3.9

ENV PYTHONNUNBUFFERED 1

ENV CODIGO=/home/problem_hub

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

CMD python manage.py makemigrations && python manage.py migrate && python manage.py runserver

#RUN npm i webpack webpack-cli

#RUN npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev

#RUN npm i react react-dom react-router-dom --save-dev

#RUN npm i @material-ui/core @material-ui/icons css-loader style-loader

#RUN npm i @babel/plugin-proposal-class-properties



#RUN source venv/bin/activate
