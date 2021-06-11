import scrapy
from ..items import ProblemhubItem
import json


class CodeForce(scrapy.Spider):
    name = 'codeforce'
    
    def __init__(self, cat=None, dif1=None, dif2=None, *args, **kwargs):
        self.d1 = ''
        self.d2 = ''
        self.cat = ''
        if(dif1 != None):
            self.d1 = dif1
        if(dif2 != None):
            self.d2 = dif2
        if(cat != None):
            self.cat = cat

    def start_requests(self):
        url = 'https://codeforces.com/problemset/page/1?tags='+str(self.cat)+'%2C'+str(self.d1)+'-'+str(self.d2)+''
        yield scrapy.Request(url=url, callback=self.parse)
    
    def parse(self, response):
        items = ProblemhubItem()
        i = 0
        for ejercicio in response.css('tr'):
            if i < 2:
                titulo = ejercicio.css('div:nth-child(1) a::text').extract()
                titulo = ("".join(titulo)).replace(" ","").replace("\n","").replace("\r","")
                categoria = ejercicio.css('.notice::text').extract()
                categoria = json.dumps(categoria)
                dificultad = ejercicio.css('.ProblemRating::text').extract() 
                if(dificultad != []):
                    dificultad = ("".join(dificultad))
                    if(int(dificultad) <= 1400):
                        dificultad = "Facil"
                    elif(int(dificultad) <= 2000):
                        dificultad = "Medio"
                    else:
                        dificultad = "Dificil"
                link = ejercicio.css('div:nth-child(1) a::attr(href)').extract()
                if(link != []):
                    url = 'https://codeforces.com/'+link[0]
                    yield scrapy.Request(url, callback=self.enunciado, meta={'items':items, 'titulo':titulo, 'categoria':categoria, 'dificultad':dificultad, 'url':url})
                i+=1
        siguiente = response.css('li+ li .arrow::attr(href)').extract()
        if(siguiente != []):
            next = 'https://codeforces.com'+siguiente[0]
            yield scrapy.Request(next, callback=self.parse)    

       

    def enunciado(self, response):
        items = response.meta['items']
        problema = response.css('.problem-statement')
        t = problema.css('.header+ div p::text, .header+ div span::text, .header+ div li::text').extract()
        texto = ("".join(t)).replace("\n"," ").replace("$$$","")
        pruebas = problema.css('pre::text, .output .title::text').extract()
        c = []
        i = 1
        casos = []
        condicion = False
        for prueba in pruebas:
            if(condicion == True):
                c.append('Returns: '+str(prueba))                
            elif(prueba.find("Output") == -1):
                c.append(prueba)
            if(condicion == True):
                #n = 'caso '+str(i)+''
                casos.append(c)
                c = []
                i +=1
                condicion = False
            if(prueba.find("Output") != -1):
                condicion = True

        casos = json.dumps(casos)

        titulo = response.meta['titulo']
        dificultad = response.meta['dificultad']
        categoria = response.meta['categoria']
        url = response.meta['url']
        items['titulo'] = titulo
        items['categoria'] = categoria
        items['dificultad'] = dificultad
        items['enunciado'] = texto
        items['pruebas'] = casos
        items['url'] = url
        return [items]


