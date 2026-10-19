package com.example.myapplication23

import android.widget.DatePicker
import java.util.Calendar

class Employee {
    var name : String = "";
    var dojDate : Int = 0;
    var dojMonth : Int = 0;
    var dojYear : Int = 0;
    var exp : Int = 0;
    var dept : String = "";


    constructor(name : String , doj : DatePicker, dept : String){
        this.name = name;
        this.dojDate = doj.dayOfMonth;
        this.dojMonth = doj.month + 1;
        this.dojYear = doj.year;
        this.dept = dept;
        val thisYear = Calendar.getInstance();
        this.exp = thisYear.get(Calendar.YEAR) - this.dojYear;

    }

    fun display (): String {
        return "$name $dojDate/$dojMonth/$dojYear $dept $exp";
    }

}