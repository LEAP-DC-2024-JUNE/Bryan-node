
/**
 * NumberFile2 class.
 * Ask the user for a filename (not including extension)
 * Ask the user how many number to print into the file
 * 
 * @author Batkhlueg Bazarragchaa
 * @version 11/13/2024
 */
import java.util.Scanner;
import java.util.Random;
// import java.lang.Math;
import java.io.File;
import java.io.PrintWriter;
import java.io.IOException;

public class NumberFile3 {
    /**
     * Main method.
     * 
     * @param args Not used.
     * @throws IOException Throws exception.
     */
    public static void main(String[] args) throws IOException {
        String filename;
        int amount;
        int maxNumber;
        Scanner keyboard = new Scanner(System.in);
        File file;
        Random random = new Random();

        System.out.print("Enter a file name: ");
        filename = keyboard.nextLine() + ".txt";
        file = new File(filename);
        while (file.exists()) {
            System.out.print("File already exists. Enter another file name: ");
            filename = keyboard.nextLine() + ".txt";
            file = new File(filename);
        }

        PrintWriter pw = new PrintWriter(filename);

        amount = getNumber(keyboard, "How many numbers to print? ");
        maxNumber = getNumber(keyboard, "What is the maximum value? ");

        for (int i = 0; i < amount; i++) {
            // System.out.print("Enter a number: ");
            // int number = keyboard.nextInt();

            // int number = (int) Math.random() * maxNumber;
            int number = random.nextInt(maxNumber + 1);

            pw.println(number);
        }

        pw.close();
        keyboard.close();
    }

    /**
     * getNumber method.
     * Takes number input and validates it.
     * 
     * @param keyboard Scanner object
     * @param prompt   Prompt for the user
     * @return number Validated number
     */
    public static int getNumber(Scanner keyboard, String prompt) {
        int amount;
        System.out.print(prompt);
        amount = keyboard.nextInt();
        while (amount < 0) {
            System.out.println("Invalid number!");
            System.out.print(prompt);
            amount = keyboard.nextInt();
        }

        return amount;
    }
}