var addon = require('./src/build/Release/fib'),
	http = require('http'),
	counter = 0;
	FIB = 40;

http.createServer(function(req, res){
	var result = addon.fib(FIB);
	counter++;
	console.log(counter);
	res.end(result.toString());
}).listen(4000);
