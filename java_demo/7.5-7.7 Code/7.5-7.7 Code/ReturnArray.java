import java.util.Scanner;

/**
 * This program demonstrates how a reference to an
 * array can be returned from a method.
 */

public class ReturnArray {
    public static void main(String[] args) {
        double[] values;
        double[] values1;
        // Let values reference the array returned
        // from the getArray method.
        values = getArray();
        values1 = getArray(5);
        // Display the values in the array.
        for (double num : values) {
            System.out.println(num);
        }
        for (double num : values1) {
            System.out.println(num);
        }

        System.out.println(values);
    }

    /**
     * The getArray method returns a reference to
     * an array of doubles.
     */
    public static double[] getArray() {
        double[] array = { 1.2, 2.3, 4.5, 6.7, 8.9 };
        System.out.println(array);
        return array;
    }

    /**
     * The getArray method returns a reference to
     * an array of doubles.
     */
    public static double[] getArray(int size) {
        // Create an array of the specified size.
        double[] array = new double[size];

        // Create a Scanner object for keyboard input.
        Scanner keyboard = new Scanner(System.in);

        System.out.println("Enter a series of " +
                array.length + " numbers.");

        // Get values from the user for the array.
        for (int index = 0; index < array.length; index++) {
            System.out.print("Number " + (index + 1) + ": ");
            array[index] = keyboard.nextDouble();
        }

        keyboard.close();

        // Return the array.
        return array;
    }
}
