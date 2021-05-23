# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
import psycopg2
from itemadapter import ItemAdapter



class ProblemhubPipeline:

    def open_spider(self, spider):
        self.conn = psycopg2.connect(host='localhost', database='problemHub', user='postgres', password='postgres')
        self.curr=self.conn.cursor()

    def process_item(self, item, spider):
        sql='insert into Problemas(titulo, categoria, dificultad, enunciado, casos_prueba, origen) values (%s,%s,%s,%s,%s,%s)'
        datos = (item['titulo'],
                item['categoria'],
                item['dificultad'],
                item['enunciado'],
                item['pruebas'],
                item['url'])
        self.curr.execute(sql, datos)
        self.conn.commit()
        return item
    def close_spider(self, spider):
        self.curr.close()
        self.conn.close()

