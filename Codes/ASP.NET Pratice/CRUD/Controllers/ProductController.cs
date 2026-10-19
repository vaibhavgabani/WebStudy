using CRUD.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace CRUD.Controllers
{
    public class ProductController : Controller
    {
        ConnectionDB connectionDB = new ConnectionDB();
        public IActionResult Index()
        {
            DataTable table = connectionDB.select("SELECT * FROM [PRODUCTTB]");
            ViewBag.ProdcutTable = table.Rows;
            return View();
        }

        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Create(ProductTB product)
        {
            if (ModelState.IsValid)
            {
                bool result = connectionDB.iud($"INSERT INTO [PRODUCTTB] (NAME,PRICE,QTY) VALUES ('{product.name}','{product.price}','{product.qty}')");
                if (result)
                {
                    ViewBag.message = "Insereted";
                }
                else
                {
                    ViewBag.message = "not Insereted";
                }
            }
            return View();
        }

        [HttpGet]
        public IActionResult Edit(int id)
        {
            Console.WriteLine("\n\n\nid is : " + id);
            ViewBag.id = id;
            return View();
        }

        [HttpGet]
        public IActionResult CheckedData()
        {
            return View();
        }

        [HttpPost]
        public IActionResult CheckedData(List<int> selectedId)
        {
            if (selectedId != null && selectedId.Count > 0)
            {
                string idlist = string.Join(",", selectedId);
                // Corrected SQL string with the variable injected
                DataTable dt = connectionDB.select($"SELECT * FROM [PRODUCTTB] WHERE id IN ({idlist})");
                ViewBag.SelectedProduct = dt.Rows;
                ViewBag.CheckId = idlist;

            }

            //Console.WriteLine($"\n\n\n SELECT * FROM [PRODUCTTB] WHERE ID = {idlist}");
            return View();
        }
    }
}
