/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package javaapplication6;
import java.io.*;

/**
 *
 * @author gaban
 */
public class Human implements Serializable{
    static int cnt = 0; 
    int id;
    String name;
    String city;
    
    public Human(String name, String city){
        try {
            cnt++;
            this.id = cnt;
            this.name = name;
            this.city = city;
            
            if(cnt != id){
                throw new CntCustomException("There is Error in Assign");
            }
            
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
        }
    }
    
    public int getId(){
        return this.id;
    }
    
    public String getName(){
        return this.name;
    }
    
    public String getCity(){
        return this.city;
    }
    
    public void Dispaly(){
        System.out.println(this.id + " " + this.name + " " + this.city);
    }
    
}
