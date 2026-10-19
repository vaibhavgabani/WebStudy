using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.Data;

namespace CRUD.Controllers
{
    public class UserLoginController : Controller
    {
        ConnectionDB connectionDB = new ConnectionDB();
        public IActionResult Index()
        {

            return View();
        }


        [HttpPost]
        public IActionResult Login(string email, string password)
        {
            DataTable dt = connectionDB.select($"SELECT * FROM [UserTB] where email = '{email}' AND password = '{password}'");
            if (dt.Rows.Count > 0)
            {
                // Set session variables
                HttpContext.Session.SetString("email",email);
                HttpContext.Session.SetString("password",password);
                return RedirectToAction("Index", "User");
            }
            else {
                Console.WriteLine("\n\n\n\nLogin Failed...");
            }


            return RedirectToAction("Index", "UserLogin");
        }

        
    }
}
