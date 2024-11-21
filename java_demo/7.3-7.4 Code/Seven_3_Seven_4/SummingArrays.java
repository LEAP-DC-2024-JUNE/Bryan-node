/**
 * The SummingArrays class.
 * 
 * @author Courtney Dixon
 * @version 7.4.2021
 */
public class SummingArrays
{
    public static void main(String[] args)
    {
        //summing the values in a numeric array
        final int ARRAY_SIZE = 25;
        int[] units = new int[ARRAY_SIZE];
        int total = 0;

        //fill the array with data
        for (int i = 0; i < units.length; i++)
        {
            if (i % 2 == 0)
            {
                units[i] = 5;
            }
            else
            {
                units[i] = 10;
            }

        }

        //sum the contents with a for loop
        for (int index = 0; index < units.length; index++)
        {
            total += units[index];
        }
        System.out.println("The total is " + total);
        
        // total = 0;
        // for (int value : units)
        // {
            // total += value;
        // }
        // System.out.println("The total is " + total);
    }
}