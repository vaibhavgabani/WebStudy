using CRUD.Models;
using Microsoft.AspNetCore.Mvc;

namespace CRUD.Controllers
{
    public class DateOnlyController : Controller
    {
        ConnectionDB connectionDB = new ConnectionDB();

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public IActionResult SaveDate(DateInputModel model)
        {
            string sqlDate = model.date?.ToString("yyyy-MM-dd") ?? "NULL";
            string sqlDateTime = model.datewithtime?.ToString("yyyy-MM-dd HH:mm:ss") ?? "NULL";

            string query = $"INSERT INTO [DateInputTB] (date, datewithtime) VALUES ('{sqlDate}', '{sqlDateTime}')";

            bool result = connectionDB.iud(query);

            if (result)
            {
                // Redirect back to Index after successful save 
                return RedirectToAction("Index");
            }

            return View("Index");
        }
    }
}