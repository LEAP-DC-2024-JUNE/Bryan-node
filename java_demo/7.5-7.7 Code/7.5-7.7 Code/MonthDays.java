/**
 * This program demonstrates an array of String objects.
 */

public class MonthDays
{
    public static void main(String[] args)
    {
        // Create an array of Strings containing the names
        // of the months.
        String[] months = { "January", "February", "March",
                "April", "May", "June", "July",
                "August", "September", "October",
                "November", "December" };

        // Create an array of ints containing the numbers
        // of days in each month.
        int[] days = { 31, 28, 31, 30, 31, 30, 31,
                31, 30, 31, 30, 31 };

        // Display the months and the days in each.
        for (int index = 0; index < months.length; index++)
        {
            System.out.println(months[index] + " has " +
                days[index] + " days.");
        }

        // final int ARRAY_SIZE = 4;
        // String[] names = new String[ARRAY_SIZE];
        // for (int index = 0; index < names.length; index++)
        // {
            // System.out.println(names[index]);
        // }
        // names[0] = "Bill";
        // names[1] = "Susan";
        // names[2] = "Steven";
        // names[3] = "Jean";
        // for (int index = 0; index < names.length; index++)
        // {
            // System.out.println(names[index]);
        // }
    }
}
