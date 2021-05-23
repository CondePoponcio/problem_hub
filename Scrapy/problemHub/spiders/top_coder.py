import scrapy
from ..items import ProblemhubItem


class TopCoder(scrapy.Spider):
    name = 'top_coder'
    def __init__(self, categoria=None, dif1=None, dif2=None, *args, **kwargs):
        if(dif1 == None):
            dif1 = ""
        if(dif2 == None):
            dif2 = ""
        if(categoria == None):
            categoria = ""
        self.start_urls = ['https://www.topcoder.com/tc?module=ProblemArchive&cat='+str(categoria)+'&div1l='+str(dif1)+'&div2l='+str(dif2)+'']

    #Buscar ejercicios dependiende de la ctaegoria y dificultad
    def parse(self, response):
        item = ProblemhubItem()
        items = item.deepcopy()

        i = 4
        for ejercio in response.css('tr~ tr+ tr'):
            if(i<20):
                titulo = response.css('tr:nth-child('+str(i)+') .alignMiddle+ .statText .statText::text').extract()
                titulo = ("".join(titulo)).replace(" ","").replace("\n","")
                categoria = response.css('tr:nth-child('+str(i)+') .statText:nth-child(6)::text').extract()
                categoria = ("".join(categoria)).replace(" ","").replace("\n","")
                dif1 = response.css('tr:nth-child('+str(i)+') .statText:nth-child(7)::text').extract()
                dif1 = ("".join(dif1)).replace(" ","").replace("\n","")
                if(dif1 == ""):
                    dif1 = "1"
                dif2 = response.css('tr:nth-child('+str(i)+') .statText:nth-child(9)::text').extract()
                dif2 = ("".join(dif2)).replace(" ","").replace("\n","")
                if(dif2 == ""):
                    dif2 = "1"
                if(dif1 == "1" and dif2 == "1" or dif1 == "1" and dif2 == "2" or dif1 == "1" and dif2 == "3"):
                    dificultad = "Facil"
                elif(dif1 == "2" and dif2 == "1" or dif1 == "2" and dif2 == "2" or dif1 == "2" and dif2 == "3"):
                    dificultad = "Medio"
                else:
                    dificultad = "Dificil"
                link = response.css('tr:nth-child('+str(i)+') .alignMiddle+ .statText a::attr(href)').extract()
                url = 'https://community.topcoder.com'+link[0]
                yield scrapy.Request(url, callback=self.enunciado, meta={'items':items, 'titulo':titulo, 'categoria':categoria, 'dificultad':dificultad, 'url':url})

            i+=1

      #  links = response.css('tr~ tr+ tr .alignMiddle+ .statText a::attr(href)').extract()
       # links2 = response.css('tr~ tr+ tr .statText:nth-child(11) a::attr(href)').extract()
       # for i in range(0,10):
        #    web = 'https://community.topcoder.com'+links2[i]
         #   yield scrapy.Request(web, callback=self.datos, meta={'items':items, 'link':links[i]})

    def datos(self, response):
        items = response.meta['items']
        link = response.meta['link']
        titulo = response.css('.paddingTable2 tr:nth-child(1) .statText .statText::text').extract()
        titulo = ("".join(titulo)).replace(" ","").replace("\n","")
        categoria = response.css('tr:nth-child(4) .statTextBig+ .statText::text').extract()
        categoria = ("".join(categoria)).replace(" ","").replace("\n","")
        dificultad = response.css('tr:nth-child(3) .statTextBig+ .statText ::text').extract()       
        dificultad = ("".join(dificultad)).replace(" ","").replace("\n","")

        web = 'https://community.topcoder.com'+link
        return [scrapy.Request(web, callback=self.enunciado, meta={'items':items, 'titulo':titulo, 'categoria':categoria, 'dificultad':dificultad})]
        #return [scrapy.Request(web, callback=self.enunciado, dont_filter=True, meta={'items':items, 'titulo':titulo, 'categoria':categoria, 'dificultad':dificultad})]



    def enunciado(self, response):
        items = response.meta['items']
        i = response.css('.problemText img').extract()
        t = None
        print(i)
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
