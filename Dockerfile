FROM python:3.9

ENV PYTHONNUNBUFFERED 1

RUN apt-get update

RUN mkdir /code

WORKDIR /code

COPY . /code/

RUN python -m pip install -r requirements.txt


RUN python -m venv venv


#RUN source venv/bin/activate
