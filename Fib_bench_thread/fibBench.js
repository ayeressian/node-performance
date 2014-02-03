var http = require('http'),
	threadsAGogo = require('threads_a_gogo'),
	FIB = 40, counter = 0,
	numCPUs = require('os').cpus().length,
	threadPool= threadsAGogo.createPool(numCPUs).all.eval(fib);

function fib(n){
	return n < 2 ? n : fib(n - 2) + fib(n - 1);
}

http.createServer(function(req, res){
	threadPool.any.eval('fib('+ FIB +')', function cb(err, result){		
		counter++;
		console.log(counter);		
		res.end(result.toString());
	});		
}).listen(4000);