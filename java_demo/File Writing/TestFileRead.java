import java.io.File;
import java.util.Scanner;
import java.io.IOException;

public class TestFileRead {
    public static void main(String[] args) throws IOException {
        File file = new File("test.txt");
        if (!file.exists()) {
            System.out.println("The file does not exist.");

            System.exit(0);
        }
        Scanner inputFile = new Scanner(file);
        while (inputFile.hasNext()) {
            System.out.println(inputFile.nextLine());
        }

        inputFile.close();
    }
}
