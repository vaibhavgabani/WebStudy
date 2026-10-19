/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package javaapplication6;

/**
 *
 * @author gaban
 */
public class Bank {
    public Account account;
    
    public Bank(Account account){
        this.account = account;
    }
    
   public synchronized void Deposit(double ammount) throws InvalidAmountException{
       
       if(ammount < 0){
           throw new InvalidAmountException("Ammount cant be natagive");
       }
       
       account.balance += ammount;
       System.out.println(ammount + "Deposit Suceffully");
   }
   
   
   public synchronized void withdraw(double ammount) throws InsufficientBalanceException{
       
       if(ammount > account.balance){
           throw new InsufficientBalanceException("in sufficent balance.");
       }
       
       account.balance -= ammount;
       System.out.println(ammount + "Widrows Suceffully");
   }
}
