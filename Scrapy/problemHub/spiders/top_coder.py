import scrapy
from ..items import ProblemhubItem


class TopCoder(scrapy.Spider):
    name = 'top_coder'
    def __init__(self, categoria=None, dif1=None, dif2=None, *args, **kwargs):
        self.d1 = ''
        self.d2 = ''
        self.cat = ''
        self.avance = 1
        if(dif1 != None):
            self.d1 = dif1
        if(dif2 != None):
            self.d2 = dif2
        if(categoria != None):
            self.cat = categoria
        self.start_urls = ['https://www.topcoder.com/tc?module=ProblemArchive&cat='+str(self.cat)+'&div1l='+str(self.d1)+'&div2l='+str(self.d2)+'']

    #Buscar ejercicios dependiende de la ctaegoria y dificultad
    def parse(self, response):
        items = ProblemhubItem()
        for ejercio in response.css('tr~ tr+ tr'):
            titulo = ejercio.css('.alignMiddle+ .statText .statText::text').extract()
            titulo = ("".join(titulo)).replace(" ","").replace("\n","")
            categoria = ejercio.css('.statText:nth-child(6)::text').extract()
            categoria = ("".join(categoria)).replace(" ","").replace("\n","")
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
            link = ejercio.css('.alignMiddle+ .statText a::attr(href)').extract()
            if(link != []):
                url = 'https://community.topcoder.com'+link[0]
                yield scrapy.Request(url, callback=self.enunciado, meta={'items':items, 'titulo':titulo, 'categoria':categoria, 'dificultad':dificultad, 'url':url})

        self.avance += 50
        siguiente = response.css('br~ .paddingTable2 .statText:nth-child(1) a::attr(href)').extract()
        if(siguiente[0] == 'Javascript:next()'):
            next = 'https://www.topcoder.com/tc?module=ProblemArchive&sr='+str(self.avance)+'&er='+str(self.avance+50)+'&cat='+str(self.cat)+'&div1l='+str(self.d1)+'&div2l='+str(self.d2)+''
            yield scrapy.Request(next, callback=self.parse)            

    def enunciado(self, response):
        items = response.meta['items']
        i = response.css('.problemText img').extract()
        t = None
        #if(i == []):
            #t = response.css('tr:nth-child(5) .statText .statText::text, tr:nth-child(4) h3::text , tr:nth-child(2) .statText+ .statText::text, tr:nth-child(2) p::text, tr:nth-child(2) b::text, tr:nth-child(2) i::text, .problemText tr:nth-child(1) h3::text').extract()
        t = response.css('tr:nth-child(2) .statText+ .statText::text, tr:nth-child(2) p::text, tr:nth-child(2) b::text, tr:nth-child(2) i::text').extract()

        #if(t != None):
        n = t[-1]
        texto = ("".join(t)).replace("\n"," ").replace(n,"")
        #else:
         #   texto = "NO VAlido."

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
        items['pruebas'] = pruebas
        items['url'] = url
        return [items]
