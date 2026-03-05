using Microsoft.AspNetCore.Mvc;
using System.Data;
using Microsoft.AspNetCore.Http;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class PatientController : Controller
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
        public IActionResult Register(UserTable user, PatientTable patient)
        {
            // 1. Email Duplication Validation
            string checkEmailSql = $"SELECT COUNT(*) as Total FROM UserTable WHERE Email = '{user.Email}'";
            DataTable dtCheck = db.Select(checkEmailSql);

            if (dtCheck != null && dtCheck.Rows.Count > 0 && Convert.ToInt32(dtCheck.Rows[0]["Total"]) > 0)
            {
                ViewBag.Error = "This email is already registered.";
                return View();
            }

            // 2. Insert User (Role 1 = Patient)
            string userSql = $"INSERT INTO UserTable (FullName, Email, [Password], RoleId) VALUES ('{user.FullName}', '{user.Email}', '{user.Password}', 1)";

            if (db.IUD(userSql))
            {
                string selectSql = $"SELECT UserId FROM UserTable WHERE Email = '{user.Email}'";
                DataTable dt = db.Select(selectSql);

                if (dt != null && dt.Rows.Count > 0)
                {
                    string userId = dt.Rows[0]["UserId"].ToString();

                    // 3. Insert Patient Details
                    string patientSql = $"INSERT INTO PatientTable (UserId, DateOfBirth, PastRecords, ContactInfo) " +
                                       $"VALUES ({userId}, '{patient.DateOfBirth:yyyy-MM-dd}', '{patient.PastRecords}', '{patient.ContactInfo}')";

                    if (db.IUD(patientSql))
                    {
                        HttpContext.Session.SetString("PatientId", userId);
                        HttpContext.Session.SetString("PatientName", user.FullName);
                        return RedirectToAction("Dashboard");
                    }
                }
            }
            return View();
        }

        public IActionResult Dashboard()
        {
            // Security check: Get Patient's UserId from Session
            string userId = HttpContext.Session.GetString("PatientId");
            if (string.IsNullOrEmpty(userId)) return RedirectToAction("Register");

            // Requirement A: Get Patient Info & Past Records
            string sql = $@"SELECT u.FullName, u.Email, p.DateOfBirth, p.PastRecords, p.ContactInfo 
                            FROM UserTable u 
                            JOIN PatientTable p ON u.UserId = p.UserId 
                            WHERE u.UserId = {userId}";
            DataTable dtPatient = db.Select(sql);

            // Requirement B: Get Doctors Profile & Availability (Using DoctorId for Foreign Keys)
            // Added d.DoctorId to the SELECT list to fix 'Column DoctorId does not belong to table' error
            string docSql = @"SELECT d.DoctorId, u.FullName, d.Specialization, d.Availability 
                             FROM UserTable u 
                             JOIN DoctorTable d ON u.UserId = d.UserId";
            ViewBag.DoctorsList = db.Select(docSql);

            // Requirement C: Get Booked Appointments for THIS Patient
            // We join with UserTable to get the Doctor's name for display
            string appSql = $@"SELECT u.FullName as DoctorName, a.AppointmentDate, a.AppointmentTime, a.Status 
                              FROM AppointmentTable a 
                              JOIN DoctorTable d ON a.DoctorId = d.DoctorId
                              JOIN UserTable u ON d.UserId = u.UserId
                              WHERE a.PatientId = (SELECT PatientId FROM PatientTable WHERE UserId = {userId})
                              ORDER BY a.AppointmentDate DESC";
            ViewBag.MyAppointments = db.Select(appSql);

            return View(dtPatient);
        }

        [HttpPost]
        public IActionResult BookAppointment(int DoctorId, string AppDate, string AppTime)
        {
            string userId = HttpContext.Session.GetString("PatientId");
            if (string.IsNullOrEmpty(userId)) return RedirectToAction("Register");

            // Fetch the correct PatientId from PatientTable (Foreign Key Requirement)
            string getPatientIdSql = $"SELECT PatientId FROM PatientTable WHERE UserId = {userId}";
            DataTable dtPatient = db.Select(getPatientIdSql);

            if (dtPatient != null && dtPatient.Rows.Count > 0)
            {
                string actualPatientId = dtPatient.Rows[0]["PatientId"].ToString();

                // Insert with correct actualPatientId and DoctorId
                string sql = $@"INSERT INTO AppointmentTable (PatientId, DoctorId, AppointmentDate, AppointmentTime, Status) 
                                VALUES ({actualPatientId}, {DoctorId}, '{AppDate}', '{AppTime}', 'Pending')";

                if (db.IUD(sql))
                {
                    TempData["Message"] = "Appointment booked successfully!";
                }
                else
                {
                    TempData["Error"] = "Database Error: Could not save the appointment.";
                }
            }
            else
            {
                TempData["Error"] = "Could not find your patient profile.";
            }

            return RedirectToAction("Dashboard");
        }

        [HttpPost]
        public IActionResult UpdateProfile(UserTable user, PatientTable patient)
        {
            string userId = HttpContext.Session.GetString("PatientId");
            if (string.IsNullOrEmpty(userId)) return RedirectToAction("Register");

            string userSql = $"UPDATE UserTable SET FullName = '{user.FullName}', Email = '{user.Email}' WHERE UserId = {userId}";
            string patientSql = $"UPDATE PatientTable SET ContactInfo = '{patient.ContactInfo}', PastRecords = '{patient.PastRecords}' WHERE UserId = {userId}";

            if (db.IUD(userSql) && db.IUD(patientSql))
            {
                HttpContext.Session.SetString("PatientName", user.FullName);
                TempData["Message"] = "Profile updated successfully!";
            }
            return RedirectToAction("Dashboard");
        }
    }
}