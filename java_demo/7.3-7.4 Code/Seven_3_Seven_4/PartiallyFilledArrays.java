import java.util.Scanner;

/**
 * The ComparingArrays class.
 * 
 * @author Courtney Dixon
 * @version 7.4.2021
 */
public class PartiallyFilledArrays {
	public static void main(String[] args) {
		// Partially filled arrays
		final int ARRAY_SIZE = 100;
		int[] array = new int[ARRAY_SIZE];
		int count = 0;
		Scanner keyboard = new Scanner(System.in);
		System.out.print("Enter a number or -1 to quit: ");
		int number = keyboard.nextInt();
		while (number != -1 && count < array.length) {
			array[count] = number;
			count++;
			System.out.print("Enter a number of -1 to quit: ");
			number = keyboard.nextInt();
		}
		for (int index = 0; index < count; index++) {
			System.out.println(array[index]);
		}
		keyboard.close();
	}
}