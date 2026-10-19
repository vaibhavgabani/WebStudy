using CRUD_Final.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Data;

namespace CRUD_Final.Controllers
{
    public class CustomerController : Controller
    {
        Connection conn = new Connection();
        public IActionResult Index(int? number)
        {
            ViewBag.email = HttpContext.Session.GetString("email");
            ViewBag.password = HttpContext.Session.GetString("password");
            String Query = $"SELECT * FROM [TourTB]";

            if (number.HasValue) { 
                Query+= $" WHERE DurationInDays = {number.Value}";
                ViewBag.yourSearch = number.Value;
            }

            DataTable table = conn.Select(Query);
            DataTable table2 = conn.DispalyUserByid(1);
            ViewBag.table = table.Rows;
            ViewBag.table2 = table2.Rows;

            return View();
        }

        [HttpPost]
        public IActionResult Search(int number)
        {
            return RedirectToAction("Index", new {number = number});
        }

        [HttpGet]
        public IActionResult Book(int tid)
        {
            DataTable table = conn.Select($"SELECT * FROM [TourTB] WHERE id = {tid}");

            if (table.Rows.Count > 0)
            {
                ViewBag.tourData = table.Rows[0];
                return View();
            }

            return RedirectToAction("Index");
        }

        [HttpPost]
        public IActionResult ConfirmBooking(int Tour_Id, int Total_Person)
        {
            string userId = HttpContext.Session.GetString("userid");

            if (string.IsNullOrEmpty(userId))
            {
                return RedirectToAction("Login");
            }

            DataTable tourTable = conn.Select($"SELECT Price FROM [TourTB] WHERE id = {Tour_Id}");

            if (tourTable.Rows.Count > 0)
            {
                double price = Convert.ToDouble(tourTable.Rows[0]["Price"]);
                double totalAmount = price * Total_Person;
                string bookingDate = DateTime.Now.ToString("dd-MM-yyyy");

                string insertQuery = $@"INSERT INTO [BookingTB] 
            (Customer_Id, Tour_Id, Booking_Date, Total_Person, Total_Amount) 
            VALUES ({userId}, {Tour_Id}, '{bookingDate}', {Total_Person}, {totalAmount});
            SELECT SCOPE_IDENTITY();";

                object newId = conn.IUD(insertQuery);
                return RedirectToAction("Bill", new { bid = newId });
            }

            return RedirectToAction("Index");
        }

        public IActionResult Bill(int bid)
        {
            string query = $@"SELECT b.*, t.Tour_Name, t.Destination, c.Customer_Name 
                     FROM [BookingTB] b 
                     JOIN [TourTB] t ON b.Tour_Id = t.id 
                     JOIN [CustomerTB] c ON b.Customer_Id = c.id 
                     WHERE b.id = {bid}";

            DataTable table = conn.Select(query);

            if (table.Rows.Count > 0)
            {
                ViewBag.billData = table.Rows[0];
                return View();
            }

            return RedirectToAction("Index");
        }

        [HttpGet]
        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Login(CustomerTB customer)
        {
            if (!ModelState.IsValid) {
                ViewBag.message = "Enter valid Data";
            }
            
            DataTable table = conn.Select($"SELECT * FROM [CustomerTB] WHERE Email_Id = '{customer.Email_id}' AND Password = '{customer.Password}'");

            if (table.Rows.Count > 0) {
                HttpContext.Session.SetString("id", table.Rows[0]["id"].ToString());
                HttpContext.Session.SetString("email",customer.Email_id);
                HttpContext.Session.SetString("password", customer.Password);
                Console.WriteLine(customer.Email_id + " "+  customer.Password);
                return RedirectToAction("Index");
            }


            ViewBag.message = "Enter valid Data";
            return RedirectToAction("Login");
        }
    }
}
