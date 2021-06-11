FROM python:3.9

ENV PYTHONNUNBUFFERED 1

RUN apt-get update

RUN mkdir /code

WORKDIR /code

COPY . /code/

RUN python -m pip install -r requirements.txt


RUN python -m venv venv

RUN apt-get install -y nodejs npm

RUN npm i webpack webpack-cli

RUN npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev

RUN npm i react react-dom react-router-dom --save-dev

RUN npm i @material-ui/core @material-ui/icons

RUN npm i @babel/plugin-proposal-class-properties
#RUN source venv/bin/activate
