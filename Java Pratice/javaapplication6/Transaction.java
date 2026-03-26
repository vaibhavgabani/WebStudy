/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package javaapplication6;

/**
 *
 * @author gaban
 */
public class Transaction implements Runnable{
    Bank bank;
    double amount;
    String type;
    
    public Transaction(Bank bank,double amount,String type){
        this.bank = bank;
        this.amount = amount;
        this.type = type;
    }
    
    public void run(){
        try {
            if(type.compareToIgnoreCase("deposite")==0){
                bank.Deposit(amount);
            } else {
                bank.withdraw(amount);
            }
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
        }
    }
}
