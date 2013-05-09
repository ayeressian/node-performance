var http = require('http');
var FIB = 40, counter = 0;

http.createServer(function(req, res){
	var result = fib(FIB);
	counter++;
	console.log(counter);
	res.end('done');
}).listen(4000, '127.0.0.1');

function fib(n){
	return n < 2 ? n : fib(n - 2) + fib(n - 1);
}
