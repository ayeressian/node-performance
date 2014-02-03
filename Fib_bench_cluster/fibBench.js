var cluster = require('cluster'),
	numCPUs = require('os').cpus().length,	
	http = require('http'),
	counter = 0, i, worker, FIB = 40;
	
function fib(n){
	return n < 2 ? n : fib(n - 2) + fib(n - 1);
}	

if (cluster.isMaster) {
	for (i = 0; i < numCPUs; i++) {
		worker = cluster.fork();
		worker.on('message',function(msg) {
			if(msg.cmd && msg.cmd === 'notifyReq') {
				counter++;
				console.log(counter);
			}
		});
	}
} else {
	http.createServer(function(req, res) {
		var result = fib(FIB);
		process.send({ cmd: 'notifyReq' });
		res.end(result.toString());
	}).listen(4000);	
}