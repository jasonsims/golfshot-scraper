#!/usr/bin/python
from HTMLParser import HTMLParser
from urllib2 import urlopen

import pdb

class HtmlListReader(HTMLParser):
  def __init__(self, url):
    self.in_list = False
    self.round_data = {}
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

  def handle_endtag(self, tag):
    if tag == 'tr':
      self.in_list = False

  def handle_data(self, data):
    if self.in_list and data.strip() != '':
      self.round_data[self.current_round].append(data.strip())


class GolfShotExporter():
  MEMBER_IDS = {'jsims': '0987080730',
               'kstabe': '0367088530'}
  BASE_URL = 'http://golfshot.com/members/'

  def __init__(self):
    self.golf_data = HtmlListReader(
        '%s%s/rounds' % (self.BASE_URL, self.MEMBER_IDS['jsims']))


  def Run(self):
    for i in self.golf_data.round_data:
      print i, self.golf_data.round_data[i]

def main():
  golf_shot_export = GolfShotExporter()
  golf_shot_export.Run()


if __name__ == '__main__':
  main()