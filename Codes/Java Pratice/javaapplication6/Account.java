/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package javaapplication6;

/**
 *
 * @author gaban
 */
public class Account {
    static int cnt = 0;
    double accountNumber;
    String accountHolderName; 
    public double balance;
    
    public Account(String accountHolderName,double balance){
        cnt++;
        this.accountNumber = cnt;
        this.accountHolderName = accountHolderName;
        this.balance = balance;
    }
    
    public void dispaly(){
        System.out.println(this.accountNumber + " " + this.accountHolderName + " " + this.balance);
    }
}
