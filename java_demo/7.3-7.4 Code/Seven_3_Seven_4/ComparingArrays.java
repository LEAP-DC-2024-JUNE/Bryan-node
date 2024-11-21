/**
 * The ComparingArrays class.
 * 
 * @author Courtney Dixon
 * @version 7.4.2021
 */
public class ComparingArrays
{
    public static void main(String[] args)
    {
        //comparing arrays the wrong way
        int[] firstArray = { 5, 10, 15, 20, 25 };
        int[] secondArray = { 5, 10, 15, 20, 25 };
        if (firstArray == secondArray)      //this is wrong
        {
            System.out.println("The arrays are the same.");
        }
        else
        {
            System.out.println("The arrays are not the same.");
        }

        //how to properly compare arrays
        int[] firstArray1 = { 2, 4, 6, 8, 10 };
        int[] secondArray1 = { 2, 4, 6, 8, 10 };
        boolean arraysEqual = true;     //flag variable
        int index = 0;                  //loop control variable
        //determine whether the arrays are the same size
        if (firstArray1.length != secondArray1.length)
        {
            arraysEqual = false;
        }
        //determine whether the elements contain the same data
        while (arraysEqual && index < firstArray1.length)
        {
            if (firstArray1[index] != secondArray1[index])
            {
                arraysEqual = false;
            }
            index++;
        }
        if (arraysEqual) 
        {
            System.out.println("The arrays are the same.");
        }
        else
        {
            System.out.println("The arrays are not the same.");
        }
    }
}

