using Microsoft.AspNetCore.Mvc;
using System.Data;
using Microsoft.AspNetCore.Http;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class StaffController : Controller // Use uppercase 'S'
    {
        DbConnection db = new DbConnection();

        [HttpGet]
        public IActionResult Register()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Register(UserTable user, StaffTable staff)
        {
            // Email Validation using $
            string checkEmailSql = $"SELECT COUNT(*) as Total FROM UserTable WHERE Email = '{user.Email}'";
            DataTable dtCheck = db.Select(checkEmailSql);

            if (dtCheck.Rows.Count > 0 && Convert.ToInt32(dtCheck.Rows[0]["Total"]) > 0)
            {
                ViewBag.Error = "This email is already registered.";
                return View();
            }

            // Insert into UserTable (Role 3 = Staff)
            string userSql = $"INSERT INTO UserTable (FullName, Email, [Password], RoleId) VALUES ('{user.FullName}', '{user.Email}', '{user.Password}', 3)";

            if (db.IUD(userSql))
            {
                // Get the UserId
                string selectSql = $"SELECT UserId FROM UserTable WHERE Email = '{user.Email}'";
                DataTable dt = db.Select(selectSql);

                if (dt.Rows.Count > 0)
                {
                    string userId = dt.Rows[0]["UserId"].ToString();

                    // Matching your Schema from image_d61a57.jpg: only UserId and Department
                    string staffSql = $"INSERT INTO StaffTable (UserId, Department) VALUES ({userId}, '{staff.Department}')";

                    if (db.IUD(staffSql))
                    {
                        HttpContext.Session.SetString("StaffId", userId);
                        HttpContext.Session.SetString("StaffName", user.FullName);
                        return RedirectToAction("Dashboard");
                    }
                }
            }
            return View();
        }

        public IActionResult Dashboard(string searchDate)
        {
            string userId = HttpContext.Session.GetString("StaffId");
            if (string.IsNullOrEmpty(userId)) return RedirectToAction("Register");

            // 1. Staff Profile Info
            string sql = $@"SELECT u.FullName, u.Email, s.Department 
                    FROM UserTable u 
                    JOIN StaffTable s ON u.UserId = s.UserId 
                    WHERE u.UserId = {userId}";
            DataTable dtStaff = db.Select(sql);

            // 2. Defaulting Logic: If searchDate is null, show all records
            string dateCondition = "";
            if (!string.IsNullOrEmpty(searchDate))
            {
                dateCondition = $" WHERE a.AppointmentDate = '{searchDate}'";
                ViewBag.SelectedDate = searchDate;
            }
            else
            {
                ViewBag.SelectedDate = "All Records";
            }

            // 3. View Doctor List (Showing those with appointments)
            string docListSql = $@"SELECT DISTINCT u.FullName, d.Specialization, d.Availability 
                          FROM AppointmentTable a
                          JOIN DoctorTable d ON a.DoctorId = d.DoctorId
                          JOIN UserTable u ON d.UserId = u.UserId
                          {dateCondition}";
            ViewBag.DoctorsOnDate = db.Select(docListSql);

            // 4. View Patient List (Arriving patients)
            string patListSql = $@"SELECT u.FullName as PatientName, a.AppointmentDate, a.AppointmentTime, a.Status, du.FullName as DoctorName
                          FROM AppointmentTable a
                          JOIN PatientTable p ON a.PatientId = p.PatientId
                          JOIN UserTable u ON p.UserId = u.UserId
                          JOIN DoctorTable d ON a.DoctorId = d.DoctorId
                          JOIN UserTable du ON d.UserId = du.UserId
                          {dateCondition}
                          ORDER BY a.AppointmentDate DESC";
            ViewBag.PatientsOnDate = db.Select(patListSql);

            return View(dtStaff);
        }

        [HttpPost]
        public IActionResult UpdateProfile(UserTable user, string Department)
        {
            string userId = HttpContext.Session.GetString("StaffId");
            if (string.IsNullOrEmpty(userId)) return RedirectToAction("Register");

            // 1. Update UserTable (FullName and Email)
            string userUpdate = $"UPDATE UserTable SET FullName = '{user.FullName}', Email = '{user.Email}' WHERE UserId = {userId}";

            // 2. Update StaffTable (Department) - Matching your schema
            string staffUpdate = $"UPDATE StaffTable SET Department = '{Department}' WHERE UserId = {userId}";

            if (db.IUD(userUpdate) && db.IUD(staffUpdate))
            {
                // Update the session name in case they changed it
                HttpContext.Session.SetString("StaffName", user.FullName);
                TempData["Message"] = "Profile updated successfully!";
            }
            else
            {
                TempData["Error"] = "Update failed. Please check your inputs.";
            }

            return RedirectToAction("Dashboard");
        }
    }
}