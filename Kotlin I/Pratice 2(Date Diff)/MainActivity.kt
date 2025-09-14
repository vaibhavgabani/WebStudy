package com.example.myapplication

import android.os.Bundle
import android.widget.Button
import android.widget.DatePicker
import android.widget.TextView
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import java.time.LocalDate
import java.time.LocalTime
import java.time.Period
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

        var btn : Button = findViewById(R.id.btn);
        var txt : TextView = findViewById(R.id.txt);
        var dateOfjoin : DatePicker = findViewById(R.id.dateOfjoin);
        var dateOfLeave : DatePicker = findViewById(R.id.dateOfLeave);

        btn.setOnClickListener {
            var dateofjoininday = dateOfjoin.dayOfMonth;
            var dateofjoinmonth = dateOfjoin.month;
            var dateofjoinyear = dateOfjoin.year;
            var dateofjoin = Calendar.getInstance()
            dateofjoin.set(dateofjoinyear,dateofjoinmonth,dateofjoininday)
            var dateofleaveinday = dateOfLeave.dayOfMonth;
            var dateofleavemonth = dateOfLeave.month;
            var dateofleaveyear = dateOfLeave.year;
            var dateofleave = Calendar.getInstance();
            dateofleave.set(dateofleaveyear,dateofleavemonth,dateofleaveinday)

            var diffInYear = dateofleave.get(Calendar.YEAR) - dateofjoin.get(Calendar.YEAR)
            var diffInMonth = dateofleave.get(Calendar.MONTH) - dateofjoin.get(Calendar.MONTH)
            var diffInDays = dateofleave.get(Calendar.DAY_OF_MONTH) - dateofjoin.get(Calendar.DAY_OF_MONTH)

            if (dateofleave.get(Calendar.DAY_OF_YEAR) < dateofjoin.get(Calendar.DAY_OF_YEAR)) {
                diffInYear--;
            }

            if (dateofleave.get(Calendar.MONTH) < dateofjoin.get(Calendar.MONTH)) {
                diffInYear--
            }


            txt.setText("$diffInYear Years $diffInMonth Months $diffInDays Days");
        }
    }
}

