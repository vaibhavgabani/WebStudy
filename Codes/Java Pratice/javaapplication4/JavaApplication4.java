    /*
     * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
     * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
     */
    package javaapplication4;

    import java.util.*;
    import java.io.*;

    /**
     *
     * @author gaban
     */
    public class JavaApplication4 {

        /**
         * @param args the command line arguments
         */
        public static void main(String[] args) {
    //        try
    //        {
    //            LogWriter lw = new LogWriter();
    //            LogReader lr = new LogReader();
    //            
    //            lw.start();
    //            lw.join();
    //            lr.start();
    //        }
    //        catch(Exception ex)
    //        {
    //            System.out.print(ex.getMessage());
    //        }

            Scanner sc = new Scanner(System.in);

            // Using ArrayList to store Human objects dynamically
            List<Human> humanList = new ArrayList<>();
            int choice = 0;

            // Loop for Menu-Driven Logic [cite: 535, 547-552]
            do {
                try {
                    System.out.println("\n--- HUMAN DATA MANAGER ---");
                    System.out.println("1. Add New Human");
                    System.out.println("2. Display All Humans");
                    System.out.println("3. Search by Name");
                    System.out.println("5. Save to File");
                    System.out.println("4. Exit");
                    System.out.print("Select an option: ");

                    choice = sc.nextInt();
                    sc.nextLine(); // Consume the leftover newline character

                    switch (choice) {
                        case 1: // Adding data to the Collection [cite: 1984, 2008]
                            System.out.print("Enter Name: ");
                            String name = sc.nextLine();
                            System.out.print("Enter Age: ");
                            int age = sc.nextInt();
                            sc.nextLine();
                            System.out.print("Enter City: ");
                            String city = sc.nextLine();

                            // Creating object and adding it to the List
                            humanList.add(new Human(name, age, city));
                            System.out.println("Success: Human added to memory.");
                            break;

                        case 2: // Displaying data using for-each loop
                            {
                                System.out.println("\n--- Registered Humans ---");
                                // read data from file
                                try {
                                    FileInputStream fs = new FileInputStream("human.txt");
                                    ObjectInputStream os = new ObjectInputStream(fs);

                                    humanList = (ArrayList<Human>) os.readObject();

                                    System.out.println("\n--- Data Loaded from File ---");
                                    if (humanList.isEmpty()) {
                                        System.out.println("No records found in the file.");
                                    } else {
                                        // 2. Display the newly loaded list
                                        for (Human h : humanList) {
                                            System.out.println(h);
                                        }
                                    }
                                } catch (Exception ex) {
                                    System.out.println(ex.getMessage());
                                }
                            }
                            break;

                        case 3: // Logic for searching within a Collection
                            System.out.print("Enter Name to search: ");
                            String searchName = sc.nextLine();
                            boolean found = false;
                            for (Human h : humanList) {
                                // Case-insensitive comparison [cite: 205-208, 212]
                                if (h.getName().equalsIgnoreCase(searchName)) {
                                    System.out.println("Match Found: " + h);
                                    found = true;
                                }
                            }
                            if (!found) {
                                System.out.println("No record found for: " + searchName);
                            }
                            break;

                        case 4:
                            System.out.println("Exiting Application...");
                            break;
                        case 5: {
                            try {
                                FileOutputStream fs = new FileOutputStream("human.txt");
                                ObjectOutputStream os = new ObjectOutputStream(fs);

                                os.writeObject(humanList);
                                System.out.println("Data successfully saved to human.txt!");
                                os.close();
                                fs.close();
                            } catch (Exception ex) {
                                System.out.println(ex.getMessage());
                            }
                        }
                        break;
                        default:
                            System.out.println("Invalid Choice. Try again.");
                    }
                } catch (InputMismatchException e) {
                    // Handling invalid input types (e.g., entering text for age) [cite: 968-970, 1024]
                    System.out.println("Error: Please enter valid numeric values for menu and age.");
                    sc.nextLine(); // Clear the scanner buffer
                }
            } while (choice != 4);

            sc.close();
        }

    }
