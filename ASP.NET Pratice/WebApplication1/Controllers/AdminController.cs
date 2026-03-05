using Microsoft.AspNetCore.Mvc;
using System.Data;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class AdminController : Controller
    {
        DbConnection db = new DbConnection();

        public IActionResult ViewAllData()
        {
            // Updated query to fetch RoleName from RoleTable
            string userSql = @"SELECT u.UserId, u.FullName, u.Email, u.Password, r.RoleName, u.CreatedAt 
                       FROM UserTable u 
                       JOIN RoleTable r ON u.RoleId = r.RoleId";

            DataTable users = db.Select(userSql);
            DataTable doctors = db.Select("SELECT * FROM DoctorTable");
            DataTable patients = db.Select("SELECT * FROM PatientTable");
            DataTable staff = db.Select("SELECT * FROM StaffTable");

            return View(new Tuple<DataTable, DataTable, DataTable, DataTable>(users, doctors, patients, staff));
        }
    }
}