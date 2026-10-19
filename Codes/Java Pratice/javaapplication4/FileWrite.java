/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package javaapplication4;
import java.io.*;
/**
 *
 * @author gaban
 */
public class FileWrite {
    public void Write(String message){
        try
        {
            FileWriter fw = new FileWriter("logs.txt",true);
            BufferedWriter bw = new BufferedWriter(fw);
            bw.write(message);
            bw.newLine();
            bw.close();
            fw.close();
        }
        catch(Exception ex)
        {
            System.out.println(ex.getMessage().toString());
        }
            
    }
}
