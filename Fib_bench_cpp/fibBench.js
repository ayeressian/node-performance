var addon = require('./build/Release/hello');
var http = require('http');
var counter = 0;

http.createServer(function(req, res){
	var result = addon.hello();
	counter++;
	console.log(counter);
	res.end('done');
}).listen(3000, '127.0.0.1');
