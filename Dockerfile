FROM python:3.9

ENV PYTHONNUNBUFFERED 1

ENV CODIGO /home/problem_hub

RUN apt-get update

RUN mkdir $CODIGO

WORKDIR $CODIGO

COPY . $CODIGO

RUN python -m pip install -r requirements.txt

RUN python -m venv venv


RUN git clone http://github.com/creationix/nvm.git /root/.nvm 


RUN bash /root/.nvm/install.sh 

RUN bash -i -c 'nvm install node';


WORKDIR $CODIGO/frontend

RUN bash -i -c 'npm install';

WORKDIR $CODIGO 

CMD python manage.py makemigrations && python manage.py migrate && python manage.py runserver

