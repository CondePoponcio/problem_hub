'''from importlib import import_module
import scrapy
from scrapy.crawler import CrawlerProcess

cat_top = ['Brute+Force', 'Dynamic+Programming', 'Graph+Theory', 'Greedy', 'Math', 'Recursion', 'Search', 'Simple+Math', 'Simple+Search%2C+Iteration', 'Sorting']
dif1_top = [1,2,3]
dif2_top = [1,2,3]
dif1_force = 0
dif2_force = 0


class ProblemhubItem(scrapy.Item):
    # define the fields for your item here like:
    titulo = scrapy.Field()
    categoria = scrapy.Field()
    dificultad = scrapy.Field()
    enunciado = scrapy.Field()
    pruebas = scrapy.Field()
    url = scrapy.Field()

class CodeForce(scrapy.Spider):
    name = 'codeforce'

    def __init__(self, *args, **kwargs):
        self.d1 = '1800'
        self.d2 = '1800'
        self.cat = 'greedy'

    def start_requests(self):
        url = 'https://codeforces.com/problemset/page/1?tags='+str(self.cat)+'%2C'+str(self.d1)+'-'+str(self.d2)+''
        yield scrapy.Request(url=url, callback=self.parse)
    
    def parse(self, response):
        items = ProblemhubItem()
        i = 0
        for ejercicio in response.css('tr'):
            titulo = ejercicio.css('div:nth-child(1) a::text').extract()
            titulo = ("".join(titulo)).replace(" ","").replace("\n","").replace("\r","")
            categoria = ejercicio.css('.notice::text').extract()
            dificultad = ejercicio.css('.ProblemRating::text').extract() 
            if(dificultad != []):
                dificultad = ("".join(dificultad))
                if(int(dificultad) <= 1400):
                    dificultad = "Facil"
                elif(int(dificultad) <= 1800):
                    dificultad = "Medio"
                else:
                    dificultad = "Dificil"
            i+=1
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

class TopCoder(scrapy.Spider):
    name = 'top_coder'
    def __init__(self, *args, **kwargs):
        self.d1 = '1'
        self.d2 = '3'
        self.cat = 'Greedy'
        self.avance = 1

    def start_requests(self):
        url = 'https://www.topcoder.com/tc?module=ProblemArchive&cat='+str(self.cat)+'&div1l='+str(self.d1)+'&div2l='+str(self.d2)+''
        yield scrapy.Request(url=url, callback=self.parse)

    #Buscar ejercicios dependiende de la ctaegoria y dificultad
    def parse(self, response):
        items = ProblemhubItem()
        i = 4
        for ejercio in response.css('tr~ tr+ tr'):
            if i < 20:
                titulo = ejercio.css('.alignMiddle+ .statText .statText::text').extract()
                titulo = ("".join(titulo)).replace(" ","").replace("\n","")
                cat = ejercio.css('.statText:nth-child(6)::text').extract()
                cat = ("".join(cat)).replace(" ","").replace("\n","")
                categoria = cat.split(",")
                dif1 = ejercio.css('.statText:nth-child(7)::text').extract()
                dif1 = ("".join(dif1)).replace(" ","").replace("\n","")
                if(dif1 == ""):
                    dif1 = "1"
                dif2 = ejercio.css('.statText:nth-child(9)::text').extract()
                dif2 = ("".join(dif2)).replace(" ","").replace("\n","")
                if(dif2 == ""):
                    dif2 = "1"
                if(dif1 == "1" and dif2 == "1" or dif1 == "1" and dif2 == "2" or dif1 == "1" and dif2 == "3"):
                    dificultad = "Facil"
                elif(dif1 == "2" and dif2 == "1" or dif1 == "2" and dif2 == "2" or dif1 == "2" and dif2 == "3"):
                    dificultad = "Medio"
                else:
                    dificultad = "Dificil"
                i+=1
                link = ejercio.css('.alignMiddle+ .statText a::attr(href)').extract()
                if(link != []):
                    url = 'https://community.topcoder.com'+link[0]
                    yield scrapy.Request(url, callback=self.enunciado, meta={'items':items, 'titulo':titulo, 'categoria':categoria, 'dificultad':dificultad, 'url':url})

        self.avance += 50
        siguiente = response.css('br~ .paddingTable2 .statText:nth-child(1) a::attr(href)').extract()
        if(siguiente != []):
            if(siguiente[0] == 'Javascript:next()'):
                next = 'https://www.topcoder.com/tc?module=ProblemArchive&sr='+str(self.avance)+'&er='+str(self.avance+50)+'&cat='+str(self.cat)+'&div1l='+str(self.d1)+'&div2l='+str(self.d2)+''
                yield scrapy.Request(next, callback=self.parse)            

    def enunciado(self, response):
        items = response.meta['items']
        t = response.css('tr:nth-child(2) .statText+ .statText::text, tr:nth-child(2) p::text, tr:nth-child(2) b::text, tr:nth-child(2) i::text').extract()

        n = t[-1]
        texto = ("".join(t)).replace("\n"," ").replace(n,"")

        pruebas = response.css('pre::text').extract()
        c = []
        i = 1
        casos = {}
        for prueba in pruebas:
            c.append(prueba)
            if(prueba.find("Returns:") != -1):
                n = 'caso '+str(i)+''
                casos[n] = c
                c = []
                i +=1
        
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


process = CrawlerProcess(settings={
    'FEED_URI': 'ejercicios.json',
    'FEED_FORMAT': 'json'
})

#process.crawl(TopCoder)
process.crawl(CodeForce)
process.start()'''