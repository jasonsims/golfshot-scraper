#!/usr/bin/python
import pymongo
from pymongo import MongoClient
from HTMLParser import HTMLParser
from urllib2 import urlopen

import pdb

class HtmlListReader(HTMLParser):
  def __init__(self, url):
    self.in_list = False
    self.page_data = False
    self.round_data = {}
    self.pages = []
    self.current_round = ''
    HTMLParser.__init__(self)
    req = urlopen(url)
    self.feed(req.read())

  def handle_starttag(self, tag, attrs):
    if tag == 'tr' and attrs:
      self.current_round = attrs[0][1]
      self.round_data[self.current_round] = []
      self.in_list = True
    elif tag == 'td' and attrs:
      pass#print "Found stat ==> %s" % attrs
    elif tag == 'div' and attrs[0][0] == 'class' and attrs[0][1] == 'pagination':
      self.page_data = True

  def handle_endtag(self, tag):
    if tag == 'tr':
      self.in_list = False
    elif tag == 'div':
      self.page_data = False

  def handle_data(self, data):
    if self.in_list and data.strip() != '':
      self.round_data[self.current_round].append(data.strip())
    elif self.page_data and data.strip() != '' and data.strip() != 'Previous' and data.strip() != 'Next':
      self.pages.append(data.strip())

class GolfShotExporter():
  BASE_URL = 'http://golfshot.com/members/'
  golfer_data = (
    {
      'jsims': {'id': '0367088530'},
      'kstabe': {'id': '0987080730'},
    })

  def __init__(self):
    #self.connection = MongoClient()
    #self.db = self.connection.gs_data

    for golfer in self.golfer_data:
      print 'Getting round data for %s' % golfer
      self.golf_shot_reader = HtmlListReader(
          '%s%s/rounds' % (self.BASE_URL, self.golfer_data[golfer]['id']))

      for page in self.golf_shot_reader.pages:
        data = HtmlListReader(
            '%s%s/rounds?page=%s' % (self.BASE_URL, self.golfer_data[golfer]['id'], page))

        self.golfer_data[golfer].update(data.round_data)

  def WriteToDb(self):
    print 'Writing new rounds to db...'
    self.db.gs_data.insert(self.golfer_data)

  def Run(self):
    for golfer in self.golfer_data:
      print '=%s =====' % golfer
      for golf_round in self.golfer_data[golfer]:
        if golf_round != 'id':
          print golf_round, self.golfer_data[golfer][golf_round]

    #self.WriteToDb()


def main():
  golf_shot_export = GolfShotExporter()
  golf_shot_export.Run()


if __name__ == '__main__':
  main()