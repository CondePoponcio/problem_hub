import scrapy
from ..items import ProblemhubItem


class CodeForce(scrapy.Spider):
    name = 'codeforce'

    def start_requests(self):
        url = 'https://codeforces.com/problemset/page/1?tags=greedy%2C1800-1800'
        yield scrapy.Request(url=url, callback=self.parse)
    
    def parse(self, response):
        items = ProblemhubItem()
        i = 0
        for ejercicio in response.css('tr'):
            titulo = ejercicio.css('div:nth-child(1) a::text').extract()
            titulo = ("".join(titulo)).replace(" ","").replace("\n","").replace("\r","")
            categoria = ejercicio.css('.notice::text').extract()
            dificultad = ejercicio.css('.ProblemRating::text').extract() 
            dificultad = ("".join(dificultad))

            link = ejercicio.css('div:nth-child(1) a::attr(href)').extract()
            if(link != []):
                url = 'https://codeforces.com/'+link[0]
                yield scrapy.Request(url, callback=self.enunciado, meta={'items':items, 'titulo':titulo, 'categoria':categoria, 'dificultad':dificultad, 'url':url})
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
        casos = {}
        condicion = False
        for prueba in pruebas:
            if(condicion == True):
                c.append('Returns: '+str(prueba))                
            elif(prueba.find("Output") == -1):
                c.append(prueba)
            if(condicion == True):
                n = 'caso '+str(i)+''
                casos[n] = c
                c = []
                i +=1
                condicion = False
            if(prueba.find("Output") != -1):
                condicion = True

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


