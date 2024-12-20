/**
 * This program demonstrates passing individual array
 * elements as arguments to a method.
 */

public class PassElements
{
    public static void main(String[] args)
    {
        // Create an array.
        int[] numbers = {5, 10, 15, 20, 25, 30, 35, 40};

        // Pass each element to the ShowValue method.
        for (int index = 0; index < numbers.length; index++)
            showValue(numbers[index]);
    }

    /**
     * The showValue method displays its argument.
     */

    public static void showValue(int n)
    {
        System.out.print(n + " ");
    }
}