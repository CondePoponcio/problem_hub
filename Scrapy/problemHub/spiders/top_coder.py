import json
import scrapy
from ..items import ProblemhubItem


class TopCoder(scrapy.Spider):
    name = 'top_coder'
    def __init__(self, cat=None, dif=None, *args, **kwargs):
        self.d = ''
        self.cat = ''
        self.avance = 1
        if(dif != None):
            self.d1 = dif
        if(cat != None):
            self.cat = cat

    def start_requests(self):
        url = 'https://www.topcoder.com/tc?module=ProblemArchive&cat='+str(self.cat)+'&div2l='+str(self.d)+''
        yield scrapy.Request(url=url, callback=self.parse)

    #Buscar ejercicios dependiende de la ctaegoria y dificultad
    def parse(self, response):
        items = ProblemhubItem()
        i = 4
        for ejercio in response.css('tr~ tr+ tr'):
            if i < 25:
                titulo = ejercio.css('.alignMiddle+ .statText .statText::text').extract()
                titulo = ("".join(titulo)).replace(" ","").replace("\n","")
                cat = ejercio.css('.statText:nth-child(6)::text').extract()
                cat = ("".join(cat)).replace(" ","").replace("\n","")
                categoria = cat.split(",")
                categoria = json.dumps(categoria)
                dif1 = ejercio.css('.statText:nth-child(7)::text').extract()
                dif1 = ("".join(dif1)).replace(" ","").replace("\n","")
                if(dif1 == ""):
                    dif1 = "obtener"
                dif2 = ejercio.css('.statText:nth-child(9)::text').extract()
                dif2 = ("".join(dif2)).replace(" ","").replace("\n","")
                if(dif2 == "1"):
                    dificultad = "Facil"
                elif(dif2 == "2"):
                    dificultad = "Medio"
                elif(dif2 == "3"):
                    dificultad = "Dificil"
                link = ejercio.css('.alignMiddle+ .statText a::attr(href)').extract()
                if(link != [] and dif1 == "obtener"):
                    url = 'https://community.topcoder.com'+link[0]
                    yield scrapy.Request(url, callback=self.enunciado, meta={'items':items, 'titulo':titulo, 'categoria':categoria, 'dificultad':dificultad, 'url':url})
                i+=1

        self.avance += 50
        siguiente = response.css('br~ .paddingTable2 .statText:nth-child(1) a::attr(href)').extract()
        if(siguiente != []):
            if(siguiente[0] == 'Javascript:next()'):
                next = 'https://www.topcoder.com/tc?module=ProblemArchive&sr='+str(self.avance)+'&er='+str(self.avance+50)+'&cat='+str(self.cat)+'&div2l='+str(self.d)+''
                yield scrapy.Request(next, callback=self.parse)            

    def enunciado(self, response):
        items = response.meta['items']
        t = response.css('tr:nth-child(2) .statText+ .statText::text, tr:nth-child(2) p::text, tr:nth-child(2) b::text, tr:nth-child(2) i::text').extract()

        n = t[-1]
        texto = ("".join(t)).replace("\n"," ").replace(n,"")

        pruebas = response.css('pre::text').extract()
        c = []
        i = 1
        casos = []
        for prueba in pruebas:
            c.append(prueba)
            if(prueba.find("Returns:") != -1):
                #n = 'caso '+str(i)+''
                casos.append(c)
                c = []
                i +=1
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
