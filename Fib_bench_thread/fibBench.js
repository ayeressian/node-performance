var http = require('http'),
	threadsAGogo = require('threads_a_gogo');

var FIB = 40, counter = 0;

var numThreads = 5;

function fib(n){
	return n < 2 ? n : fib(n - 2) + fib(n - 1);
}

var threadPool= threadsAGogo.createPool(numThreads).all.eval(fib);

http.createServer(function(req, res){
	threadPool.any.eval('fib(40)', function cb(err, data){		
		counter++;		
		console.log(counter);		
		res.end();
	});		
}).listen(3000, '127.0.0.1');


