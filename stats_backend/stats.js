/**
  * @author jsims@nutanix.com (Jason Sims)
  */


/**
 * Module dependencies.
 */
var restify = require('restify'),
    stats   = require('./lib/statsRetriever'),
    server  = restify.createServer();

server.get('/api/lowRounds', stats.lowRound);
server.get('/api/highRounds', stats.highRound);
server.get('/api/totalRounds', stats.totalRounds);
server.get('/api/avgGir', stats.avgGir);
server.get('/api/avgPuttGir', stats.avgPuttGir);
server.get('/api/avgFairway', stats.avgFairway);
server.get('/api/avgRoundScore', stats.avgRoundScore);

server.listen(8080, function() {
  console.log('%s is waiting for some shit at %s', server.name, server.url);
});
