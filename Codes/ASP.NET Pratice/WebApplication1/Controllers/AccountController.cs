using Microsoft.AspNetCore.Mvc;
using System.Data;
using Microsoft.AspNetCore.Http;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class AccountController : Controller
    {
        DbConnection db = new DbConnection();

        [HttpGet]
        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Login(string Email, string Password)
        {
            // 1. Query UserTable to verify credentials and get RoleId
            string sql = $"SELECT UserId, FullName, RoleId FROM UserTable WHERE Email = '{Email}' AND [Password] = '{Password}'";
            DataTable dt = db.Select(sql);

            if (dt.Rows.Count > 0)
            {
                string userId = dt.Rows[0]["UserId"].ToString();
                string fullName = dt.Rows[0]["FullName"].ToString();
                int roleId = Convert.ToInt32(dt.Rows[0]["RoleId"]);

                // 2. Redirect based on RoleId (1=Patient, 2=Doctor, 3=Staff)
                if (roleId == 1)
                {
                    HttpContext.Session.SetString("PatientId", userId);
                    HttpContext.Session.SetString("PatientName", fullName);
                    return RedirectToAction("Dashboard", "Patient");
                }
                else if (roleId == 2)
                {
                    HttpContext.Session.SetString("DoctorId", userId);
                    HttpContext.Session.SetString("DoctorName", fullName);
                    return RedirectToAction("Dashboard", "Doctor");
                }
                else if (roleId == 3)
                {
                    HttpContext.Session.SetString("StaffId", userId);
                    HttpContext.Session.SetString("StaffName", fullName);
                    return RedirectToAction("Dashboard", "Staff");
                }
            }

            // 3. If login fails
            ViewBag.Error = "Invalid Email or Password. Please try again.";
            return View();
        }

        public IActionResult Logout()
        {
            // Clear all possible user sessions
            HttpContext.Session.Clear();
            return RedirectToAction("Index", "Home");
        }
    }
}