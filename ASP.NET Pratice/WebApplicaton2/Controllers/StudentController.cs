using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class StudentController : Controller
    {
        string connectionString = "Data Source=(LocalDB)\\MSSQLLocalDB;AttachDbFilename=C:\\Users\\Admin\\Documents\\dbstudent.mdf;Integrated Security=True;Connect Timeout=30";
        public IActionResult Index()
        {
            List<Student> students = new List<Student>();
            using(SqlConnection con = new SqlConnection(connectionString))
            {
                string query = "SELECT * FROM Student";
                SqlCommand cmd = new SqlCommand(query, con);
                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    students.Add(new Student
                    {
                        id = (int)reader["id"],
                        name = reader["name"].ToString(),
                        age = (int)reader["age"],
                        email = reader["email"].ToString()
                    });
                }
            }
            return View(students);
        }

        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Create(Student student)
        {
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                string query = "INSERT INTO Student (name, age, email) VALUES (@name, @age, @email)";
                SqlCommand cmd = new SqlCommand(query, con);

                cmd.Parameters.AddWithValue("@name", student.name);
                cmd.Parameters.AddWithValue("@age", student.age);
                cmd.Parameters.AddWithValue("@email", student.email);
                con.Open();
                cmd.ExecuteNonQuery();
            }
            return RedirectToAction("Index");
        }

        [HttpGet]
        public IActionResult Edit(int id)
        {
            Student student = new Student();

            using(SqlConnection con = new SqlConnection(connectionString))
            {
                string query = "SELECT * FROM Student where  id = @id";
                SqlCommand cmd = new SqlCommand(query, con);
                cmd.Parameters.AddWithValue("@id", id);

                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();

                if(reader.Read())
                {
                    student.id = (int)reader["id"];
                    student.name = reader["name"].ToString();
                    student.age = (int)reader["age"];
                    student.email = reader["email"].ToString();
                }
            }

            return View(student);
        }

        [HttpPost]
        public IActionResult Edit(Student student)
        {
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                string query = "UPDATE Student SET name=@name, age=@age, email=@email WHERE id=@id";
                SqlCommand cmd = new SqlCommand(query, con);

                cmd.Parameters.AddWithValue("@id", student.id);
                cmd.Parameters.AddWithValue("@name", student.name);
                cmd.Parameters.AddWithValue("@age", student.age);
                cmd.Parameters.AddWithValue("@email", student.email);

                con.Open();
                cmd.ExecuteNonQuery();
            }

            return RedirectToAction("Index");
        }

        [HttpGet]
        public IActionResult Delete(int id)
        {
            Student student = new Student();

            using (SqlConnection con = new SqlConnection(connectionString))
            {
                string query = "SELECT * FROM Student WHERE id=@id";
                SqlCommand cmd = new SqlCommand(query, con);
                cmd.Parameters.AddWithValue("@id", id);

                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();

                if (reader.Read())
                {
                    student.id = (int)reader["id"];
                    student.name = reader["name"].ToString();
                    student.age = (int)reader["age"];
                    student.email = reader["email"].ToString();
                }
            }

            return View(student);
        }

        [HttpPost, ActionName("Delete")]
        public IActionResult DeleteConfirmed(int id)
        {
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                string query = "DELETE FROM Student WHERE id=@id";
                SqlCommand cmd = new SqlCommand(query, con);
                cmd.Parameters.AddWithValue("@id", id);

                con.Open();
                cmd.ExecuteNonQuery();
            }

            return RedirectToAction("Index");
        }
    }
}
