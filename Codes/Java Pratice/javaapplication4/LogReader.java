/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package javaapplication4;

import java.io.BufferedReader;
import java.io.FileReader;

/**
 *
 * @author gaban
 */
public class LogReader extends Thread{
       public void run(){
           try
        {
           String result = null;
           FileReader fr = new FileReader("logs.txt");
           BufferedReader br = new BufferedReader(fr);
           
            while((result = br.readLine()) != null){
               System.out.println(result);
            }
            br.close();
            fr.close();
        }
        catch(Exception ex)
        {
            System.out.println(ex.getMessage().toString());
        }
       }
}
