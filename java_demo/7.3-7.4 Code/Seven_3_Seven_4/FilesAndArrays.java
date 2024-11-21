import java.util.Scanner;
import java.io.File;
import java.io.PrintWriter;
import java.io.FileNotFoundException;

/**
 * The ComparingArrays class.
 * 
 * @author Courtney Dixon
 * @version 7.4.2021
 */
public class FilesAndArrays {
	public static void main(String[] args) throws FileNotFoundException {
		// Arrays and Files
		int[] numbers = { 10, 20, 30, 40, 50 };
		// open the file
		PrintWriter outputFile = new PrintWriter("Values.txt");
		// write the array elements to the file
		for (int index = 0; index < numbers.length; index++) {
			outputFile.println(numbers[index]);
		}
		// close the file
		outputFile.close();

		// how to open Values.txt and read its contents into an array
		final int SIZE = 5;
		int[] newNumbers = new int[SIZE];
		int index = 0;
		// open the file for reading
		File file = new File("Values.txt");
		Scanner inputFile = new Scanner(file);
		// read the file contents into the array
		while (inputFile.hasNext() && index < newNumbers.length) {
			newNumbers[index] = inputFile.nextInt();
			index++;
		}
		// close the file
		inputFile.close();
		// print the contents of the new array
		for (int index1 = 0; index1 < newNumbers.length; index1++) {
			System.out.println(newNumbers[index1]);
		}
	}
}