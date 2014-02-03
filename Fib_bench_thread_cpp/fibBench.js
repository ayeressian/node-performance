var addon = require('./src/build/Release/fib'),
	http = require('http'),
	threadsAGogo = require('threads_a_gogo'),
	counter = 0,
	numCPUs = require('os').cpus().length,
	FIB = 40,
	threadPool= threadsAGogo.createPool(numCPUs).all.eval(fib);
	
function fib(n){
	return addon.fib(n);
}

http.createServer(function(req, res){
	threadPool.any.eval('fib(' + FIB + ')', function cb(err, result){
		counter++;
		console.log(counter + '-' + result);
		res.end(result);
	});
}).listen(4000);