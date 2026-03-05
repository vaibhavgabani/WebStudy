/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package javaapplication2;
import java.util.*;
import java.io.*;
/**
 *
 * @author gaban
 */
public class JavaApplication2 {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        int choice = 0;
        LinkedList <Category> catageryList = new LinkedList<>();
        LinkedList <Prd> productList = new LinkedList<>();
        Scanner input = new Scanner(System.in);
        
        do{
            System.out.println("Press 1 : Add Catogary");
            System.out.println("Press 2 : Add Prodcuts");
            System.out.println("Press 3 : Display Catogary");
            System.out.println("Press 4 : Display Prodcuts");
            System.out.println("Press 5 : Delete Catogary");
            System.out.println("Press 6 : Write in File");
            System.out.println("Press 0 : Edit");
            System.out.println("Enter Here : ");
            choice = input.nextInt();
            input.nextLine();
            switch(choice){
                case 0:
                {
                    System.out.println("Exit.......");
                    break;
                }
                case 1:
                {
                    System.out.println("Enter Name of categary : ");
                    String name = input.nextLine();
                    Category cat = new Category(name);
                    catageryList.add(cat);
                }
                break;
                case 2:
                {
                    if(catageryList.size() <= 0){
                        System.out.println("There is NO catogary avillable so cant add prodcut...");
                        break;
                    }
                    System.out.println("Enter Prodcut Name : ");
                    String name = input.nextLine();
                    
                    System.out.println("Enter Prodcut price : ");
                    double price = input.nextDouble();
                    
                    System.out.println("Enter Prodcut Catogary id : ");
                    int catid = input.nextInt();
                    
                    if(isCategoryAvailable(catid,catageryList) == false){
                        System.out.println("Catogary not Avillable....");
                    }
                    
                    Prd pr = new Prd(name,price,catid);
                    productList.add(pr);
                    
                    
                    
                }
                break;
                case 3:
                {
                    if(catageryList.size() > 0){
                        for(Category cat : catageryList){
                            String values = cat.Display();
                            System.out.print(values);
                        }
                    } else {
                        System.out.println("There is Zero Catogary....");
                    }
                }
                break;
                case 4: 
                {
                    if(productList.size() > 0){
                        
                        for(Prd pr : productList){
                            String cname = "";
                            for(Category cat : catageryList){
                                if(pr.getCatid() == cat.getId()){
                                    cname = cat.getName();
                                }
                            }
                            String values = pr.Display(cname);
                            System.out.print(values);
                        }
                    } else {
                        System.out.println("There is Zero Prodcut....");
                    }
                }
                break;
                
                case 5:
                {
                    if(catageryList.isEmpty()){
                        System.out.println("There are 0 categories.");
                        break;
                    }

                    System.out.println("Enter Category ID to delete: ");
                    int cid = input.nextInt();
                    input.nextLine(); // Clear buffer

                    // Step 1: Check if any product is using this Category ID
                    boolean isBusy = false;
                    for(Prd pr : productList) {
                        if(pr.getCatid() == cid) {
                            isBusy = true;
                            break; // Stop searching once we find even one product
                        }
                    }

                    if(isBusy) {
                        System.out.println("Error: Category is associated with a product and cannot be deleted!");
                    } else {
                        // Step 2: Find the category object in the list
                        Category foundCat = null;
                        for(Category cat : catageryList) {
                            if(cat.getId() == cid) {
                                foundCat = cat;
                                break;
                            }
                        }

                        // Step 3: Remove it if it exists
                        if(foundCat != null) {
                            catageryList.remove(foundCat);
                            System.out.println("Category deleted successfully.");
                        } else {
                            System.out.println("Category ID not found.");
                        }
                    }
                }
                
                case 6:
                {
                    try
                    {
                        FileWriter fw = new FileWriter("data.txt");
                        for(Prd ps : productList){
                            String data = ps.Display();
                            fw.write(data + "\n");
                        }
                        fw.close();
                        System.out.println("Successfully written to data.txt!");
                    }
                    catch(Exception ex)
                    {
                        ex.getMessage();
                    }
                    
                }

                break;
                default:
                    System.out.println("Enter Valid Choice...\n");
                    break;
            }
        }while(choice != 0);
    }
    
    
    public static boolean isCategoryAvailable (int id , LinkedList<Category> list){
        for(Category cat : list){
            if(id == cat.getId()){
                return true;
            }
        }
        return false;
    }   
}
