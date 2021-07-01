#!/bin/bash
#export PATH=$PATH
cd /home/problem_hub/Scrapy/ejercicios

#Initializing two variables
cat=$1
dificultad=$2
cat_top=""
cat_force=""

if [ "$cat" = "Greedy" ]
then
    cat_top="Greedy"
    cat_force="greedy"
elif [ "$cat" = "Brute+force" ]
then
    cat_top="Brute+Force"
    cat_force="brute+force"
elif [ "$cat" = "Dynamic+Programming"] 
then
    cat_top="Dynamic+Programming"
    cat_force="dp"
elif [ "$cat" = "Graph+Theory" ]
then
    cat_top="Graph+Theory"
    cat_force="graphs"
elif [ "$cat" = "Sorting" ]
then
    cat_top="Sorting"
    cat_force="sortings"
fi

#Check the dificulty
if [ "$cat" = "" ]
then
    scrapy crawl top_coder -a cat=Greedy -o Total.json
    scrapy crawl top_coder -a cat=Brute+Force -o Total.json
    scrapy crawl top_coder -a cat=Dynamic+Programming -o Total.json
    scrapy crawl top_coder -a cat=Graph+Theory -o Total.json
    scrapy crawl top_coder -a cat=Sorting -o Total.json
    scrapy crawl codeforce -a cat=greedy -o Total.json
    scrapy crawl codeforce -a cat=brute+force -o Total.json
    scrapy crawl codeforce -a cat=dp -o Total.json
    scrapy crawl codeforce -a cat=graphs -o Total.json
    scrapy crawl codeforce -a cat=sortings -o Total.json
elif [ "$dificultad" = "Facil" ]
then
    scrapy crawl top_coder -a cat=$cat_top -a dif=1 -o $cat-Facil.json
    scrapy crawl codeforce -a cat=$cat_force -a dif1=0 -a dif2=1400 -o $cat-Facil.json
elif [ "$dificultad" = "Media" ]
then
    scrapy crawl top_coder -a cat=$cat_top -a dif=2 -o $cat-Medio.json
    scrapy crawl codeforce -a cat=$cat_force -a dif1=1401 -a dif2=2000 -o $cat-Medio.json
elif [ "$dificultad" = "Dificil" ]
then
    scrapy crawl top_coder -a cat=$cat_top -a dif=3 -o $cat-Dificil.json
    scrapy crawl codeforce -a cat=$cat_force -a dif1=2001 -a dif2=3500 -o $cat-Dificil.json
fi
  


