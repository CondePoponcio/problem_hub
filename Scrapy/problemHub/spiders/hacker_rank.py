import scrapy
from scrapy.http import FormRequest
from scrapy.utils.response import open_in_browser
from ..items import ProblemhubItem


class TopCoder(scrapy.Spider):
    name = 'hacker_rank'
    login = ""
    password = ""
    start_urls = ['https://www.hackerrank.com/auth/login', 'https://www.hackerrank.com/challenges/compare-the-triplets/problem']
    login_url = 'https://www.hackerrank.com/auth/login'

    #Buscar ejercicios dependiende de la ctaegoria y dificultad
    def start_requests(self):
        #token = response.css('meta[name="csrf-token"]::attr(content)').extract()
        #yield{'token': token}
        yield scrapy.Request(self.login_url, self.parse_login)

    def parse_login(self, response):
        data, url, method = fill_login_form(response.url, response.body, self.login, self.password)
        return scrapy.FormRequest(url, formdata=dict(data), method=method, callback=self.start_crawl)
    
    def start_crawl(self, response):
        yield scrapy.Request(url)
        

