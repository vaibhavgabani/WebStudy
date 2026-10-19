/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package javaapplication4;
import java.io.*;
import java.util.*;
/**
 *
 * @author gaban
 */
public class Human implements Serializable {
    
    // Private variables ensure data security (Encapsulation) 
    private String name;
    private int age;
    private String city;

    // Constructor to initialize the human object [cite: 22]
    public Human(String name, int age, String city) {
        this.name = name; // 'this' refers to the current class instance variable [cite: 1192-1194, 1215]
        this.age = age;
        this.city = city;
    }

    // --- Getters and Setters ---
    // These methods provide controlled access to private variables [cite: 32]

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    // --- Display Method ---
    // Overriding toString() is the standard way to return a string representation [cite: 1137-1138, 1148, 1173]
    @Override
    public String toString() {
        return "Human Detail: [Name=" + name + ", Age=" + age + ", City=" + city + "]";
    }
}
