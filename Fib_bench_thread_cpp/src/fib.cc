#include <node.h>
#include <v8.h>

using namespace v8;

int fib(int n) {
	return n < 3 ? n : fib(n - 1) + fib(n - 2);
}

Handle<Value> Method(const Arguments& args) {
	int value = args[0]->NumberValue();
	int result = fib(value);
	HandleScope scope;
	return scope.Close(Number::New(result));
}

void init(Handle<Object> exports) {
	exports->Set(String::NewSymbol("fib"),
			FunctionTemplate::New(Method)->GetFunction());
}

NODE_MODULE(fib, init)
