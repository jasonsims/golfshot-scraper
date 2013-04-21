/**
  * @author jsims@nutanix.com (Jason Sims)
  */


/**
 * Module dependencies.
 */
var restify = require('restify'),
    stats   = require('./lib/statsRetriever'),
    verify  = require('./lib/paramVerify'),
    server  = restify.createServer();

server.use(restify.queryParser({ mapParams: true }));

server.get('/api/lowRounds', verify.queryParams, stats.lowRound);
server.get('/api/highRounds', verify.queryParams, stats.highRound);
server.get('/api/totalRounds', verify.queryParams, stats.totalRounds);
server.get('/api/avgGir', verify.queryParams, stats.avgGir);
server.get('/api/avgPuttGir', verify.queryParams, stats.avgPuttGir);
server.get('/api/avgFairway', verify.queryParams, stats.avgFairway);
server.get('/api/avgRoundScore', verify.queryParams, stats.avgRoundScore);

server.listen(8080, function() {
  console.log('%s is waiting for some shit at %s', server.name, server.url);
});
