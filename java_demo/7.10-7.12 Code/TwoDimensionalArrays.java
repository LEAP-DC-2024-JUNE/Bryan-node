/**
 * The TwoDimensionalArrays class.
 * 
 * @author Courtney Dixon
 * @version 19.4.2021
 */
public class TwoDimensionalArrays
{
    /**
     * Main method.
     * 
     * @param args command-line arguments (not used)
     */
    public static void main(String[] args)
    {
        int[][] numbers = { { 1, 2, 3, 4 },
                { 5, 6, 7, 8 },
                {9, 10, 11, 12 } };

        // for (int row = 0; row < 3; row++)                    
        // {
        // for (int col = 0; col < 4; col++)
        // {
        // System.out.println(numbers[row][col]);
        // }
        // }
        // System.out.println();

        // //smarter way using length fields
        // for (int row = 0; row < numbers.length; row++)
        // {
        // for (int col = 0; col < numbers[row].length; col++)
        // {
        // System.out.println(numbers[row][col]);
        // }
        // }

        //summing all the elements in a 2D array
        int total;
        // total = 0;
        // for (int row = 0; row < numbers.length; row++)
        // {
        // for (int col = 0; col < numbers[row].length; col++)
        // {
        // total += numbers[row][col];
        // }
        // }
        // System.out.println("The total is " + total);

        //summing up the rows of a 2D array
        // for (int row = 0; row < numbers.length; row++)
        // {
        // total = 0;
        // for (int col = 0; col < numbers[row].length; col++)
        // {
        // total += numbers[row][col];
        // // System.out.println("Total of row " + row + " is " + total);
        // }
        // System.out.println("Total of row " + row + " is " + total);
        // }

        //summing the columns in a 2D array
        // for (int col = 0; col < numbers[0].length;col++)
        // {
        // total = 0;
        // for (int row = 0; row < numbers.length; row++)
        // {
        // total += numbers[row][col];
        // //System.out.println("Total of column " + col + " is " + total);
        // }
        // System.out.println("Total of column " + col + " is " + total);
        // }

        //How to created Ragged Arrays
        int[][] ragged = new int [4][];     //partially created 2D array
        ragged[0] = new int[3];             //Row 0 has 3 columns
        ragged[1] = new int[4];             //Row 1 has 4 columns
        ragged[2] = new int[5];             //Row 2 has 5 columns
        ragged[3] = new int[6];             //Row 3 has 6 columns

        //displays the number of columns in each row
        for (int index = 0; index < ragged.length; index++)                    
        {
            System.out.println("The number of columns "
                + "in row " + index + " is "
                + ragged[index].length);
        }
    }

}
