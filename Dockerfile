FROM python:3.9
ENV PYTHONNUNBUFFERED 1
RUN mkdir /code

WORKDIR /code

COPY requirements.txt /code/

RUN python -m pip install -r requirements.txt

COPY . /code/