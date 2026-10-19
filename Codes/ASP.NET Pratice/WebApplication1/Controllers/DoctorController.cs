using Microsoft.AspNetCore.Mvc;
using System.Data;
using WebApplication1.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Data.SqlClient;

namespace WebApplication1.Controllers
{
    public class DoctorController : Controller
    {
        DbConnection db = new DbConnection();

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public IActionResult Register()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Register(UserTable user, DoctorTable doctor)
        {
            // 1. Validation: Check if the Email already exists in the database
            string checkEmailSql = "SELECT COUNT(*) as Total FROM UserTable WHERE Email = '" + user.Email + "'";
            DataTable dtCheck = db.Select(checkEmailSql);

            if (dtCheck.Rows.Count > 0 && Convert.ToInt32(dtCheck.Rows[0]["Total"]) > 0)
            {
                // Set error message to display on the form
                ViewBag.Error = "This email is already registered. Please use a different one.";
                return View();
            }

            // 2. Insert into UserTable (RoleId 2 = Doctor)
            string userSql = "INSERT INTO UserTable (FullName, Email, [Password], RoleId) " +
                             "VALUES ('" + user.FullName + "', '" + user.Email + "', '" + user.Password + "', 2)";

            if (db.IUD(userSql))
            {
                // 3. Fetch the generated UserId
                string selectSql = "SELECT UserId, RoleId FROM UserTable WHERE Email = '" + user.Email + "'";
                DataTable dt = db.Select(selectSql);

                if (dt.Rows.Count > 0)
                {
                    string userId = dt.Rows[0]["UserId"].ToString();
                    string roleId = dt.Rows[0]["RoleId"].ToString();

                    // 4. Insert doctor details (Specialization and Availability)
                    string doctorSql = "INSERT INTO DoctorTable (UserId, Specialization, Availability, ProfileDetails) " +
                                       "VALUES (" + userId + ", '" + doctor.Specialization + "', '" + doctor.Availability + "', '" + doctor.ProfileDetails + "')";

                    if (db.IUD(doctorSql))
                    {
                        // Set Sessions
                        HttpContext.Session.SetString("DoctorId", userId);
                        HttpContext.Session.SetString("DoctorName", user.FullName);

                        return RedirectToAction("Dashboard");
                    }
                }
            }
            return View();
        }

        public IActionResult Dashboard(string searchDate)
        {
            // 1. Get the UserId from the current session
            string userId = HttpContext.Session.GetString("DoctorId");
            if (string.IsNullOrEmpty(userId)) return RedirectToAction("Login", "Account");

            // 2. FETCH EVERYTHING: JOIN DoctorTable with UserTable to get FullName and Email
            // This fix removes the 'Column FullName does not belong' error
            string sqlProfile = $@"SELECT u.FullName, u.Email, d.DoctorId, d.Specialization, d.Availability, d.ProfileDetails 
                          FROM UserTable u 
                          JOIN DoctorTable d ON u.UserId = d.UserId 
                          WHERE u.UserId = {userId}";

            DataTable dtDoctor = db.Select(sqlProfile);

            if (dtDoctor != null && dtDoctor.Rows.Count > 0)
            {
                string actualDoctorId = dtDoctor.Rows[0]["DoctorId"].ToString();

                // 3. Logic for Appointments list (remains same)
                string listSql;
                if (string.IsNullOrEmpty(searchDate))
                {
                    listSql = $@"SELECT u.FullName, a.AppointmentDate, a.AppointmentTime, a.Status 
                        FROM AppointmentTable a 
                        JOIN PatientTable p ON a.PatientId = p.PatientId
                        JOIN UserTable u ON p.UserId = u.UserId 
                        WHERE a.DoctorId = {actualDoctorId}
                        ORDER BY a.AppointmentDate DESC";
                    ViewBag.SelectedDate = "All Records";
                }
                else
                {
                    listSql = $@"SELECT u.FullName, a.AppointmentDate, a.AppointmentTime, a.Status 
                        FROM AppointmentTable a 
                        JOIN PatientTable p ON a.PatientId = p.PatientId
                        JOIN UserTable u ON p.UserId = u.UserId 
                        WHERE a.DoctorId = {actualDoctorId} AND a.AppointmentDate = '{searchDate}'";
                    ViewBag.SelectedDate = searchDate;
                }

                ViewBag.DateWisePatients = db.Select(listSql);

                // 4. Update Total Count
                DataTable dtTotal = db.Select($"SELECT COUNT(*) as Total FROM AppointmentTable WHERE DoctorId = {actualDoctorId}");
                ViewBag.TotalAppointments = dtTotal.Rows[0]["Total"];
            }

            return View(dtDoctor); // Now passing a table that includes 'FullName'
        }


        [HttpPost]
        public IActionResult UpdateProfile(UserTable user, string Specialization, string Availability, string ProfileDetails)
        {
            // 1. Get the logged-in doctor's UserId from the session
            string userId = HttpContext.Session.GetString("DoctorId");
            if (string.IsNullOrEmpty(userId)) return RedirectToAction("Login", "Account");

            // 2. Update UserTable (Personal Info like Full Name and Email)
            string userSql = $"UPDATE UserTable SET FullName = '{user.FullName}', Email = '{user.Email}' WHERE UserId = {userId}";

            // 3. Update DoctorTable (Professional details and Schedule)
            string docSql = $@"UPDATE DoctorTable 
                       SET Specialization = '{Specialization}', 
                           Availability = '{Availability}', 
                           ProfileDetails = '{ProfileDetails}' 
                       WHERE UserId = {userId}";

            // 4. Execute both and provide feedback
            if (db.IUD(userSql) && db.IUD(docSql))
            {
                // Update the session name so the header "Welcome, Dr. Name" refreshes immediately
                HttpContext.Session.SetString("DoctorName", user.FullName);
                TempData["Message"] = "Profile and schedule updated successfully!";
            }
            else
            {
                TempData["Error"] = "An error occurred while updating your profile.";
            }

            return RedirectToAction("Dashboard");
        }

        public IActionResult PatientList(string searchDate)
        {
            string doctorId = HttpContext.Session.GetString("DoctorId");
            if (string.IsNullOrEmpty(doctorId)) return RedirectToAction("Login", "Account");

            // Default to today's date if no date is picked
            string targetDate = string.IsNullOrEmpty(searchDate) ? DateTime.Now.ToString("yyyy-MM-dd") : searchDate;

            // A. Count total patients for the specific date
            string countSql = $"SELECT COUNT(*) as Total FROM AppointmentTable WHERE DoctorId = {doctorId} AND AppointmentDate = '{targetDate}'";
            DataTable dtCount = db.Select(countSql);
            ViewBag.TotalDateWise = dtCount.Rows[0]["Total"];
            ViewBag.SelectedDate = targetDate;

            // B. Detailed patient list for that date
            string listSql = $@"SELECT p.FullName, a.AppointmentTime, a.Status 
                        FROM AppointmentTable a 
                        JOIN UserTable p ON a.PatientId = p.UserId 
                        WHERE a.DoctorId = {doctorId} AND a.AppointmentDate = '{targetDate}'";
            DataTable dtList = db.Select(listSql);

            return View(dtList);
        }

        [HttpPost]
        public IActionResult SetSchedule(string Availability)
        {
            string userId = HttpContext.Session.GetString("DoctorId");
            if (string.IsNullOrEmpty(userId)) return RedirectToAction("Login", "Account");

            // Updates the Availability column in DoctorTable
            string sql = $"UPDATE DoctorTable SET Availability = '{Availability}' WHERE UserId = {userId}";

            if (db.IUD(sql))
            {
                TempData["Message"] = "Schedule updated successfully!";
            }
            return RedirectToAction("Dashboard");
        }
    }
}