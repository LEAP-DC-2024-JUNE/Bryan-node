/**
 * The AveragingArrays class.
 * 
 * @author Courtney Dixon
 * @version 7.4.2021
 */
public class AveragingArrays
{
    public static void main(String[] args)
    {
        //getting the average of the values in a numeric array
        final int ARRAY_SIZE = 10;
        int[] scores = new int[ARRAY_SIZE];
        double total = 0;
        double average;
        
        //fill the array with data
        for (int i = 0; i < scores.length; i++)
        {
            if (i % 2 == 0)
            {
                scores[i] = 2;
            }
            else
            {
                scores[i] = 13;
            }

        }

        //add up all the values in the array
        for (int index = 0; index < scores.length; index++)
        {
            total += scores[index];
        }
        average = total / scores.length;
        System.out.println("The average is " + average);
    }
}