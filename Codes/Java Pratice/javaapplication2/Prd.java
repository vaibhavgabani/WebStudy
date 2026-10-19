/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package javaapplication2;
import java.util.*;
import java.io.*;
/**
 *
 * @author gaban
 */
public class Prd implements Serializable {
   static int cnt = 0;
   int prdid;
   String prdnm;
   double price;
   int catid;
   
   public Prd(String prdnm,double price,int catid){
       this.cnt++;
       this.prdid=cnt;
       this.prdnm = prdnm;
       this.price = price;
       this.catid = catid;
   }
   
   public String Display(){
      return " "+prdid+" "+prdnm+" "+price+" "+" "+catid + "\n";
   }
   
   public String Display(String cname){
      return " "+prdid+" "+prdnm+" "+price+" "+" "+catid +" "+ cname + "\n";
   }
   
   public int getCatid(){
       return this.catid;
   }
}
