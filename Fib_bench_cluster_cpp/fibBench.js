var cluster = require('cluster');

if (cluster.isMaster) {
	(function() {				
		var numCPUs = require('os').cpus().length,
			reqCounter = 0, i, worker;
	  	// Fork workers.
		for (i = 0; i < numCPUs; i++) {
			worker = cluster.fork();
			worker.on('message',function(msg) {
				if(msg.cmd && msg.cmd === 'notifyReq') {
					reqCounter++;
					console.log(reqCounter);					
				}
			});
		}
  		cluster.on('exit', function(worker, code, signal) {
			console.log('worker ' + worker.process.pid + ' died');
		});
		
	})();
} else {
	(function() {		
		var addon = require('./build/Release/hello'),		
			http = require('http');
		// Workers can share any TCP connection
		// In this case its a HTTP server
		http.createServer(function(req, res) {
			var result = addon.hello();
			process.send({ cmd: 'notifyReq' });		
			res.end();
		}).listen(3000);
	})();
}
