gsExtractor
===========
This code scrapes round data from [Golfshot](http://golfshot.com/) and stores it into mongodb. It will scrape data for all golfers listed in the config file as long as their profile is public.

Setup
-----
* Install [mongodb](http://www.mongodb.org/downloads)
* `git clone https://github.com/jasonsims/gsExtractor.git`

Configuration
--------------
* Edit golfshot.cfg to contain your golfshot ID and database info
* Run `gs.py`

Dependencies
------------
[display_tools](https://github.com/jasonsims/display_tools)
Extracts golfshot round data for stats comparison against your friends.

Comming Soon!
-------------
[ ] Analytics front-end for comparing your stats against friends
