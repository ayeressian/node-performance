

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class FibBench
 */
@WebServlet("/FibBench")
public class FibBench extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public FibBench() {
        super();        
    }
    
    private int fib(int n){
    	if (n < 3) {
    		return n;
    	}
    	return fib(n - 2) + fib(n - 1);
    }
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		fib(40);
		PrintWriter out = response.getWriter();
	    out.println("Done");
	}	

}
