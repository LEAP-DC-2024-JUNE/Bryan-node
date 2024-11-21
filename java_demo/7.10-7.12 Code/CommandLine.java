/**
 * This program displays the arguments passed to
 * it from the operating system command line. 
 * 
 * @author Gaddis
 * @version 6th Edition
 */

public class CommandLine
{
    public static void main(String[] args)
    {
        for (int i = 0; i < args.length; i++)
        {
            System.out.println(args[i]);
        }
    }
}
