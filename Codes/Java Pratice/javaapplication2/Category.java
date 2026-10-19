/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package javaapplication2;
import java.util.*;
/**
 *
 * @author gaban
 */
public class Category {
    static int cnt = 0;
    int catid;
    String catname;
    
    public Category(String catname){
        this.cnt++;
        this.catid = cnt;
        this.catname = catname;
    }
    
    public String Display(){
      return " "+catid+" "+catname + "\n";
    }
    
    public int getId(){
        return this.catid;
    }
    public String getName(){
        return this.catname;
    }
}
