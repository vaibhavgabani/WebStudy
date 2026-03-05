using CRUD.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using Microsoft.AspNetCore.Http;

namespace CRUD.Controllers
{
    public class UserController : Controller
    {
        ConnectionDB connectionDB = new ConnectionDB();
        public IActionResult Index()
        {
            DataTable dt = connectionDB.select("SELECT * FROM [UserTB]");
            ViewBag.UsersFromIndex = dt.Rows;
            var emailFromSession = HttpContext.Session.GetString("email");
            ViewBag.EmailFromSession = emailFromSession;
            return View();
        }

        // Create User
        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Create(UserTB user)
        {
            if (ModelState.IsValid) {
                bool result = connectionDB.iud($"Insert INTO [UserTB] (name,email,password) values ('{user.name}','{user.email}','{user.password}')");

                if (result)
                {
                    Console.WriteLine("User Creted.");
                }
                else
                {
                    Console.WriteLine("User Not Creted.");
                }
                return RedirectToAction("Index");
            }
            
            return View();
        }


        //delete user
        [HttpGet]
        public IActionResult Delete(int id) {
            bool result = connectionDB.iud($"DELETE FROM [UserTB] where id = '{id}'");
            if (result)
            {
                Console.WriteLine("User Deleted.");
            }
            else
            { 
                Console.WriteLine("User Not Deleted.");
            }

            return RedirectToAction("Index");
        }

        //update user
        [HttpGet]
        public IActionResult Edit(int id)
        {
            DataTable dt = connectionDB.select($"SELECT * FROM [UserTB] where id = '{id}'");
            ViewBag.UserFromEdit = dt.Rows[0];
            return View();
        }

        [HttpPost]
        public IActionResult Edit(UserTB user)
        {
            if (ModelState.IsValid) {
                bool result = connectionDB.iud($"UPDATE [UserTB] set name='{user.name}', email='{user.email}' , password='{user.password}' where id='{user.id}'");
                if (result)
                {
                    Console.WriteLine("User Updated."); 
                }
                else
                {
                    Console.WriteLine("User Not Updated.");
                }
                return RedirectToAction("Index");
            }
            return View();
        }
    }
}
