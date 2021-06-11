#!/bin/bash
#export PATH=$PATH
cd /home/problem_hub/Scrapy/ejercicios

#Initializing two variables
cat=$1
dificultad=$2
  
#Check whether they are equal
if [ "$dificultad" = "Facil" ]
then
    scrapy crawl top_coder -a cat=$cat -a dif=1 -o $cat-Facil.json
    scrapy crawl codeforce -a cat=$cat -a dif1=0 -a dif2=1400 -o $cat-Facil.json
elif [ "$dificultad" = "Media" ]
then
    scrapy crawl top_coder -a cat=$cat -a dif=2 -o $cat-Medio.json
    scrapy crawl codeforce -a cat=$cat -a dif1=1401 -a dif2=2000 -o $cat-Medio.json
elif [ "$dificultad" = "Dificil" ]
then
    scrapy crawl top_coder -a cat=$cat -a dif=3 -o $cat-Dificil.json
    scrapy crawl codeforce -a cat=$cat -a dif1=2001 -a dif2=3500 -o $cat-Dificil.json
fi
  



