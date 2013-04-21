Setup
======
- Ensure you have downloaded your golfshot data with ../gs.py
- Run: npm install

Example Usage
==============
`curl "http://localhost:8080/api/avgRoundScore"`

Available Queries
------------------
* lowRounds
* highRounds
* avgGir
* avgPuttGir
* avgFairway
* avgRoundScore
* totalRounds

Query Params
-------------
###### Date Range #
Example: `curl "http://localhost:8080/api/avgRoundScore?startDate=2013-01-01&endDate=2013-12-31"`
