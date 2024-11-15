import java.io.PrintWriter;
import java.io.IOException;

public class NumberFile {
    public static void main(String[] args) throws IOException {
        PrintWriter pw = new PrintWriter("numbers.txt");
        for (int i = 1; i <= 5; i++) {
            pw.println(i);
        }
        pw.close();
    }
}
