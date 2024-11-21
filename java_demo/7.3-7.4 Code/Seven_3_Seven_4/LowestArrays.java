/**
 * The ComparingArrays class.
 * 
 * @author Courtney Dixon
 * @version 7.4.2021
 */
public class LowestArrays {
    public static void main(String[] args) {
        // finding the lowhest value in a numeric array
        final int ARRAY_SIZE = 50;
        int[] numbers = new int[ARRAY_SIZE];
        int lowest;

        // fill the array with data
        for (int i = numbers.length - 1; i >= 0; i--) {
            numbers[i] = (i + 1) * 5;
        }

        // Display the array
        for (int number : numbers) {
            System.out.print(number + " ");
        }

        lowest = numbers[0];
        // find the lowest value in the array
        for (int index = 1; index < numbers.length; index++) {
            if (numbers[index] < lowest) {
                lowest = numbers[index];
            }
        }
        for (int index = 0; index < numbers.length; index++) {
            System.out.print(numbers[index] + " ");
        }
        System.out.println();
        System.out.println("The lowest value is " + lowest);
    }
}