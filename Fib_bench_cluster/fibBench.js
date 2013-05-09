var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;

var FIB = 40, counter = 0;

function fib(n){
	return n < 2 ? n : fib(n - 2) + fib(n - 1);
}

if (cluster.isMaster) {
  	// Fork workers.
	for (var i = 0; i < numCPUs; i++) {
		cluster.fork();
	}

  	cluster.on('exit', function(worker, code, signal) {
		console.log('worker ' + worker.process.pid + ' died');
	});
} else {
	// Workers can share any TCP connection
	// In this case its a HTTP server
	http.createServer(function(req, res){
		var result = fib(FIB);		
		counter++;
		console.log(counter);
		res.end('done');
	}).listen(4000);
}
