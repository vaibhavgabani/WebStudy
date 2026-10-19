package com.example.myapplication

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.example.myapplication.database.databasehelper
import kotlin.math.sign

class LoginActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.login)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        var signup : TextView = findViewById(R.id.Signup);


        signup.setOnClickListener {
            val intent = Intent(this, RegisterActivity::class.java);
            startActivity(intent);
        }

        //input
        var email: EditText = findViewById(R.id.email);
        var password: EditText = findViewById(R.id.password);

        //output
        var output : TextView = findViewById(R.id.ans);



        //button
        var login : Button = findViewById(R.id.login);


        //database helper
        var helper = databasehelper(this);

        login.setOnClickListener {
            var result : Boolean = helper.login_user(email.text.toString(), password.text.toString());
            if (result == true){
                var intent = Intent(this, HomeActivity::class.java);
                intent.putExtra("email",email.text.toString());
                intent.putExtra("password",password.text.toString());
                startActivity(intent);
            } else {
                output.text = "Enter Valid Credentials";
            }

        }

    }
}