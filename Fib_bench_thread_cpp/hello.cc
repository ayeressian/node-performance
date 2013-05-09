#include <node.h>
#include <v8.h>

using namespace v8;

int fib(int n){
	return n<3?n:fib(n-1) + fib(n-2);
}

Handle<Value> Method(const Arguments& args) {
  HandleScope scope;
  int result = fib(40);
  return scope.Close(Number::New(result));
}

void init(Handle<Object> exports) {
  exports->Set(String::NewSymbol("hello"),
      FunctionTemplate::New(Method)->GetFunction());
}

NODE_MODULE(hello, init)
