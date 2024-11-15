import java.io.PrintWriter;
import java.io.IOException;

public class TestPrintWriter {
    public static void main(String[] args) throws IOException {
        TestPrintWriter.method();
    }

    public static void method() throws IOException {
        PrintWriter pw = new PrintWriter("test.txt");
        pw.println(("Line1"));
        pw.println("Line2");
        pw.close();
    }
}