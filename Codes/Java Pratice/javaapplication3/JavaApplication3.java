/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package javaapplication3;
import java.util.*;
/**
 *
 * @author gaban
 */
public class JavaApplication3 {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        // TODO code application logic here
        try
        {
            boolean result = true;
            if(result)
            {
                throw new CustomExc("there is Error in Code");
            }
        }
        catch(CustomExc ex)
        {
            ex.getMessage();
        }
    }
    
}
