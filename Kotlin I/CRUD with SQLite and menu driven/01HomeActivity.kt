package com.example.myapplication

import android.content.Intent
import android.database.Cursor
import android.os.Bundle
import android.util.AndroidException
import android.widget.ArrayAdapter
import android.widget.Button
import android.widget.EditText
import android.widget.ListView
import android.widget.Spinner
import android.widget.TextView
import android.widget.Toast
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.example.myapplication.database.databasehelper
import java.util.ArrayList

class RegisterActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.register)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        // input
        var email : EditText = findViewById(R.id.email);
        var password : EditText = findViewById(R.id.password);
        var role : Spinner = findViewById(R.id.role);
        var amount : EditText = findViewById(R.id.amount);
        var login : TextView = findViewById(R.id.login);

        //output
        var output : ListView = findViewById(R.id.display);

        //button
        var btnInsert : Button = findViewById(R.id.insert);
        var dispaly  : Button = findViewById(R.id.dispaly);

        //array
        var role_arr = arrayOf("admin", "user")
        var display_array = ArrayList<String>();

        //adapter
        var tmpRoleAdapter = ArrayAdapter(this, android.R.layout.simple_spinner_item,role_arr);
        role.adapter = tmpRoleAdapter;

        var tmpDispalyAdapter = ArrayAdapter(this, android.R.layout.simple_list_item_1,display_array);
        output.adapter = tmpDispalyAdapter;

        //helper
        var helper = databasehelper(this);


        fun dispaly_All(){
            var cursor : Cursor = helper.display_user();

            display_array.clear();
            if(cursor.count > 0){
                while(cursor.moveToNext()){
                    display_array.add("${cursor.getString(0)} || ${cursor.getString(1)} || ${cursor.getString(2)} || ${cursor.getString(3)}");
                }
                var tmpDispalyAdapter = ArrayAdapter(this, android.R.layout.simple_list_item_1,display_array);
                output.adapter = tmpDispalyAdapter;


            }
        }

        btnInsert.setOnClickListener {
            var result = helper.insert_user(email.text.toString(), password.text.toString(), role.selectedItem.toString() , amount.text.toString().toInt());

            if(result){
                dispaly_All();
            } else {
                Toast.makeText(this, "Error in insert Record !!!", Toast.LENGTH_SHORT).show()
            }
        }
        dispaly.setOnClickListener {
            dispaly_All();
        }

        login.setOnClickListener {
            var intent = Intent(this, LoginActivity::class.java);
            startActivity(intent);
        }


        output.setOnItemClickListener {
            parent , view , position , id ->
            Toast.makeText(this,display_array[position], Toast.LENGTH_SHORT).show();
        }

    }

}