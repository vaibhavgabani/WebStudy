/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package javaapplication6;
import java.lang.*;
import java.util.*;
import java.sql.*;
import java.io.*;
/**
 *
 * @author gaban
 */
public class JavaApplication6 {
    static Connection connect;
    static ArrayList<Human> humanArray = new ArrayList<>();
    
    
    public static void main(String[] args) {
//        JDBC();
//        HumanCode();
           Account acc = new Account("rahul", 1000);
           Bank bank = new Bank(acc);
           Transaction th = new Transaction(bank, 1000, "deposite");
           Thread th1 = new Thread(th);
           Thread t1 = new Thread(new Transaction(bank, 1000, "deposite"));
           Thread t2 = new Thread(new Transaction(bank, -1000, "deposite"));
           Thread t3 = new Thread(new Transaction(bank, 1000, "widrows"));
           Thread t4 = new Thread(new Transaction(bank, 10000, "widrows"));
           
           th1.start();
           t1.start();
           t2.start();
           t3.start();
           t4.start();
    }
    
    public static void JDBC(){
        try{
            connect = DriverManager.getConnection(
                    "jdbc:mysql://localhost:3306/javadb",
                    "root",
                    ""
            );
        } catch (Exception ex){
            System.out.println(ex.getMessage());
        }
        int choice = 0;
        
        do{
            Scanner scanner = new Scanner(System.in);
            System.out.println("\n\nBellow Use Normal Statements");
            System.out.println("Press 1 : Insert ");
            System.out.println("Press 2 : Dispaly ");
            System.out.println("Press 3 : Update ");
            System.out.println("Press 4 : Delete ");
            System.out.println("\n\nBellow Use Normal PreparedStatements");
            System.out.println("Press 5 : Insert ");
            System.out.println("Press 6 : Dispaly ");
            System.out.println("\n\nBellow Use Normal CallableStatements");
            System.out.println("Press 7 : Insert ");
            System.out.println("Press 8 : Dispaly ");
            System.out.println("Press 9 : Update ");
            System.out.println("Press 0 : Exit ");
            System.out.println("Enter Your Choice Here : ");
            choice = scanner.nextInt();
            
            switch (choice) {
                case 1:
                {
                    InsertStatement();
                }
                    break;
                case 2:
                {
                    DispalyStatement();
                }
                    break;
                case 3:
                {
                    UpdateStatement();
                }
                    break;
                case 4:
                {
                    DeleteStatement();
                }
                    break;
                case 5:
                {
                    InsertPreapreStatements();
                }
                    break;
                case 6:
                {
                    DispalyPreapreStatements();
                }
                    break;
                case 8:
                {
                    DispalyCallableStatements();
                }
                    break;
                case 9:
                {
                    UpdateCallableStatements();
                            
                }
                    break;                     
                default:
                    System.out.println("Enter Valid Choice....");
                    break;
            }
        } while(choice != 0);
    
    }
    
    public static void InsertStatement(){
        try{
            Scanner scanner = new Scanner(System.in);
            System.out.println("Enter Name : ");
            String name = scanner.nextLine();
            
            System.out.println("Enter Email : ");
            String email = scanner.nextLine();
            
            Statement statement = connect.createStatement();
            int result = statement.executeUpdate("INSERT INTO `usertb` (`id`, `name`, `email`) VALUES (NULL, '"+name+"', '"+email+"')");
            
            if(result > 0){
                System.out.println("Record Inserted Sucessfully");
            } else {
                System.out.println("Failed To Insert Record");
            }
        } catch (Exception ex){
            System.out.println(ex.getMessage());
        }
    }
    
    public static void DispalyStatement(){
            try{
                Statement statement = connect.createStatement();
                ResultSet result = statement.executeQuery("SELECT * FROM `usertb`");

                if(!result.isBeforeFirst()){
                    System.out.println("No Record Found...");
                    return;
                }

                while(result.next()){
                    System.out.println(result.getString("id") + " " + result.getString("name") + " " +result.getString("email"));
                }


            } catch (Exception ex){
                System.out.println(ex.getMessage());
            }
        }
        
    public static void DeleteStatement(){
            try{
                Scanner scanner = new Scanner(System.in);
                System.out.println("Enter ID which you want to delete : ");
                int id = scanner.nextInt();
                
                Statement statement = connect.createStatement();
                
                int result = statement.executeUpdate("DELETE FROM usertb WHERE `usertb`.`id` = "+id+" ");
                
                if(result > 0){
                    System.out.println("Record Deleted Sucessfully");
                } else {
                    System.out.println("Record Not Found / Delete");
                }


            } catch (Exception ex){
                System.out.println(ex.getMessage());
            }
        }
        
    public static void UpdateStatement(){
            try{
                Scanner scanner = new Scanner(System.in);
                
                System.out.println("Enter id which name and email you want to change : ");
                int id = scanner.nextInt();
                scanner.nextLine();
                
                System.out.println("Enter New Name : ");
                String name = scanner.nextLine();
                
                System.out.println("Enter New Email : ");
                String email = scanner.nextLine();
                
                Statement statement = connect.createStatement();
                int result = statement.executeUpdate("UPDATE `usertb` SET `name` = '"+name+"', `email` = '"+email+"' WHERE `usertb`.`id` = "+id+"");

                if(result > 0){
                    System.out.println("Record Updated Sucessfully");
                } else {
                    System.out.println("Record Not Found / Updated");
                }
            } catch (Exception ex){
                System.out.println(ex.getMessage());
            }
        }
    
    public static void InsertPreapreStatements(){
        try {
            Scanner scanner = new Scanner(System.in);
            System.out.println("Enter Name : ");
            String name = scanner.nextLine();
            
            System.out.println("Enter Email : ");
            String email = scanner.nextLine();
            
            PreparedStatement statement = connect.prepareStatement("INSERT INTO `usertb` (`id`, `name`, `email`) VALUES (NULL,?,?)");
            statement.setString(1, name);
            statement.setString(2, email);
            
            int result = statement.executeUpdate();
            
            if(result > 0){
                System.out.println("Record Inserted Sucessfully");
            } else {
                System.out.println("Failed To Insert Record");
            }
            
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
        }
    }
    
    public static void DispalyPreapreStatements(){
        try {
           PreparedStatement statement = connect.prepareStatement("SELECT * FROM USERTB");
           ResultSet result = statement.executeQuery();
           
           if(!result.isBeforeFirst()){
                System.out.println("There is No Values");
                return;
           }
           
           while(result.next()){
               System.out.println(result.getString("id") + " " + result.getString("name") + " " +result.getString("email"));
           }
           
           
            
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
        }
    }
    
    public static void DispalyCallableStatements(){
        try {
           CallableStatement statement = connect.prepareCall("{call GetAllUser()}");
           
           ResultSet result = statement.executeQuery();
           
           if(!result.isBeforeFirst()){
               System.out.println("There is No Values");
               return;
           }
           
           while(result.next()){
               System.out.println(result.getString("id") + " " + result.getString("name") + " " +result.getString("email"));
           }
           
            
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
        }
    }
    
    public static void UpdateCallableStatements(){
        try {
            Scanner scanner = new Scanner(System.in);
                
            System.out.println("Enter id which name and email you want to change : ");
            int id = scanner.nextInt();
            scanner.nextLine();
                
            System.out.println("Enter New Name : ");
            String name = scanner.nextLine();
                
            System.out.println("Enter New Email : ");
            String email = scanner.nextLine();
            
            CallableStatement statement = connect.prepareCall("{CALL `UpdateUser`(?, ?, ?)}");
            statement.setInt(1, id);
            statement.setString(2, name);
            statement.setString(3, email);
            
            int result = statement.executeUpdate();
            
            if(result > 0){
                System.out.println("Record Updated Sucessfully");
            } else {
                System.out.println("Record Not Found / Updated");
            }
            
            
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
        }
    }
    
    public static void HumanCode(){
        int choice = 0;
        Scanner scanner = new Scanner(System.in);
        do{
            System.out.println("Press 1 : Insert");
            System.out.println("Press 2 : SearchByname");
            System.out.println("Press 3 : Serilied & DeSerilided");
            System.out.println("Press 0 : Exit");
            System.out.println("Enter Here : ");
            choice = scanner.nextInt();
            

            switch (choice) {
                case 1:
                {
                    HumanInsert();
                }
                    break;
                case 2:
                {
                    HumanSearchByName();
                }
                    break;
                case 3:
                {
                   SeriliedAndDeSerilided();
                }
                    break;                
                default:
                    System.out.println("Enter Valid Choice...");
                    break;
            }
        }while(choice != 0);
    }
    
    public static void HumanInsert(){
        Scanner scanner = new Scanner(System.in);
        System.out.println("Enter Name : ");
        String name = scanner.nextLine();
            
        System.out.println("Enter city : ");
        String city = scanner.nextLine();
        
        Human human = new Human(name,city);
        humanArray.add(human);
        
        System.out.println("Data Added Cusessfully");
    }
    
    public static void HumanSearchByName(){
        
        if(humanArray.size() <= 0){
            System.out.println("HumanArray is Empty...");
            return;
        }
        
        Scanner scanner = new Scanner(System.in);
        System.out.println("Enter Name : ");
        String name = scanner.nextLine();
        boolean found = false;
        
        for(Human human : humanArray){
            if (human.getName().toLowerCase().startsWith(name)) {
                human.Dispaly();
                found = true;
            }
        }
        if (!found) {
            System.out.println("No names found starting with '" + name + "'");
        } else {
            System.out.println("Search completed successfully.");
        }

    }
    
    public static void SeriliedAndDeSerilided(){
        if(humanArray.size() <= 0){
            System.out.println("HumanArray is Empty...");
            return;
        }
        try {
            //Serilied
            FileOutputStream fo = new FileOutputStream("java.txt");
            ObjectOutputStream os = new ObjectOutputStream(fo);
            
            os.writeObject(humanArray);
            
            //Deserilied
            FileInputStream fi = new FileInputStream("java.txt");
            ObjectInputStream is = new ObjectInputStream(fi);
            
            ArrayList<Human> dhuman = new ArrayList<>();
            dhuman = (ArrayList<Human>)is.readObject();
            
            for(Human human : dhuman){
                human.Dispaly();
            }    
            
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
        }
    }
}
