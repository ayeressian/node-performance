cmd_Release/obj.target/fib.node := flock ./Release/linker.lock g++ -shared -pthread -rdynamic -m64  -Wl,-soname=fib.node -o Release/obj.target/fib.node -Wl,--start-group Release/obj.target/fib/fib.o -Wl,--end-group 
