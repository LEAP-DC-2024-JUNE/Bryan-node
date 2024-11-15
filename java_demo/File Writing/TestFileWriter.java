import java.io.FileWriter;
import java.io.PrintWriter;
import java.io.IOException;

public class TestFileWriter {
    public static void main(String[] args) throws IOException {
        TestFileWriter.method();
    }

    public static void method() throws IOException {
        FileWriter fw = new FileWriter("test.txt", true);
        PrintWriter pw = new PrintWriter(fw);

        pw.println("Line3");
        pw.println("Line4");
        pw.close();
    }
}
