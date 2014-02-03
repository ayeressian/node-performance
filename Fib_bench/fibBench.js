var http = require('http'),
	FIB = 40, counter = 0;
	
function fib(n){
	return n < 2 ? n : fib(n - 2) + fib(n - 1);
}

http.createServer(function(req, res){
	var result = fib(FIB);
	counter++;
	console.log(counter);
	res.end(result.toString());
}).listen(4000);