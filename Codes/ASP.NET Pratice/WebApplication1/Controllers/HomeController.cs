using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Data;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class HomeController : Controller
    {
        // Using your specific DbConnection class
        DbConnection db = new DbConnection();

        public IActionResult Index()
        {
            // Call seeding so it runs as soon as the app starts
            seeding();
            return View();
        }

        // Void function to check and create roles
        public void seeding()
        {
            try
            {
                // Check if roles are already in the table
                DataTable dt = db.Select("SELECT COUNT(*) as Total FROM RoleTable");

                if (dt.Rows.Count > 0 && Convert.ToInt32(dt.Rows[0]["Total"]) == 0)
                {
                    // Insert roles required for the Hospital Management system
                    db.IUD("INSERT INTO RoleTable (RoleName) VALUES ('Patient')");
                    db.IUD("INSERT INTO RoleTable (RoleName) VALUES ('Doctor')");
                    db.IUD("INSERT INTO RoleTable (RoleName) VALUES ('Staff')");

                    Console.WriteLine("RoleTable has been seeded successfully.");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Seeding Error: " + ex.Message);
            }
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}