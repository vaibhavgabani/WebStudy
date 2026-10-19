/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package javaapplication4;

/**
 *
 * @author gaban
 */
public class LogWriter extends Thread{
    public void run(){
        try {
            FileWrite fw = new FileWrite();
            System.out.println("Thred is Statred");
            fw.Write("log:Server is start");
            fw.Write("Error: Server under load");
            fw.Write("Error: Server under stop");
            fw.Write("log: Server is start");
            fw.Write("log: Server is running");
            System.out.println("Work is done");
        } 
        catch(Exception ex)
        {
            ex.getMessage();
        }    
    }
}
