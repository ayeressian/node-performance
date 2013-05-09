var addon = require('./build/Release/hello'),
	http = require('http'),
	threadsAGogo = require('threads_a_gogo');

var counter = 0;

var numThreads = 5;

function fib(){
	debugger;
	return addon.hello();
}

var threadPool= threadsAGogo.createPool(numThreads).all.eval(fib);

http.createServer(function(req, res){
	threadPool.any.eval('fib()', function cb(err, data){		
		counter++;		
		console.log(counter);		
		res.end();
	});		
}).listen(3000, '127.0.0.1');


