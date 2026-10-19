package com.example.myapplication23

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.ArrayAdapter
import android.widget.Button
import android.widget.DatePicker
import android.widget.EditText
import android.widget.ListView
import android.widget.Spinner
import android.widget.Toast
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import java.util.Calendar

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_main)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        //input filds
        var name : EditText = findViewById(R.id.name);
        var doj : DatePicker = findViewById(R.id.doj);
        var dept : Spinner = findViewById(R.id.dept);
        var listDisplay : ListView = findViewById(R.id.outputList);

        //display
        var output : ListView = findViewById(R.id.outputList);

        //button
        var submit : Button = findViewById(R.id.submit);
        var display : Button = findViewById(R.id.display);
        var exp: Button = findViewById(R.id.exp);
        var maxExp: Button = findViewById(R.id.maxExp);
        var openActivity2: Button = findViewById(R.id.openActivity2);

        //array
        var employees = ArrayList<Employee>();
        var displayArr = ArrayList<String>();
        var arrDept = arrayOf("HR", "IT", "Finance");

        //ADAPTER
        var deptAdapter = ArrayAdapter(this,android.R.layout.simple_spinner_item,arrDept);
        dept.adapter = deptAdapter;

        var displayAdapter = ArrayAdapter(this,android.R.layout.simple_list_item_1,displayArr);
        listDisplay.adapter = displayAdapter;

        // click events
        submit.setOnClickListener(View.OnClickListener{
            var emp = Employee(name.text.toString(),doj,dept.selectedItem.toString());
            employees.add(emp);
        })

        display.setOnClickListener(View.OnClickListener{
            displayArr.clear()
            for(emp in employees){
                displayArr.add(emp.display());
            }
            var adapter = ArrayAdapter(this,android.R.layout.simple_list_item_1,displayArr);
            listDisplay.adapter = adapter;
        })

        exp.setOnClickListener {
            displayArr.clear()
            for(emp in employees){
                if(emp.exp >= 5){
                    displayArr.add(emp.display());
                }
            }
            var adapter = ArrayAdapter(this,android.R.layout.simple_list_item_1,displayArr);
            listDisplay.adapter = adapter;
        }

        maxExp.setOnClickListener {
            displayArr.clear();

            var tempexp = 0;
            var tmpString = "";
            for(emp in employees){
                if(tempexp < emp.exp){
                    tmpString = "";
                    tmpString = emp.display();
                    tempexp = emp.exp;
                }
            }
            displayArr.add(tmpString);
            var adapter = ArrayAdapter(this,android.R.layout.simple_list_item_1,displayArr);
            listDisplay.adapter = adapter;

        }

        openActivity2.setOnClickListener { 
            var activity2 = Intent(this, MainActivity2::class.java);
            startActivity(activity2);
        }
            listDisplay.setOnItemClickListener { parent, view, position, id ->
                Toast.makeText(this, displayArr[position], Toast.LENGTH_SHORT).show()
            }
    }
}