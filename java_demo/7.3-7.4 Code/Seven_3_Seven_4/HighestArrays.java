/**
 * The ComparingArrays class.
 * 
 * @author Courtney Dixon
 * @version 7.4.2021
 */
public class HighestArrays {
    public static void main(String[] args) {
        // finding the highest value in a numeric array
        final int ARRAY_SIZE = 50;
        int[] numbers = new int[ARRAY_SIZE];
        int highest;

        // fill the array with data
        for (int i = 0; i < numbers.length; i++) {
            numbers[i] = (i + 1) * 2;
        }

        // Display the array
        for (int number : numbers) {
            System.out.print(number + " ");
        }

        highest = numbers[0];
        // find the highest value in the array
        for (int index = 1; index < numbers.length; index++) {
            if (numbers[index] > highest) {
                highest = numbers[index];
            }
        }
        System.out.println("The highest value is " + highest);
    }
}