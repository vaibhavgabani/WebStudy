using Microsoft.Data.SqlClient;
using System.Data;

namespace WebApplication1.Controllers
{
    public class DbConnection
    {
        SqlConnection connect = new SqlConnection("Data Source=(LocalDB)\\MSSQLLocalDB;AttachDbFilename=C:\\Users\\gaban\\OneDrive\\Documents\\Hospital.mdf;Integrated Security=True;Connect Timeout=30");
        SqlCommand command = new SqlCommand();

        public DbConnection()
        {
            try
            {
                connect.Open();
                Console.WriteLine("connect to db");
                connect.Close();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
        }

        public bool IUD(String str)
        {
            try
            {
                connect.Open();
                command = new SqlCommand(str, connect);
                command.ExecuteNonQuery();
                connect.Close();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            return false;
        }

        public DataTable Select(String str)
        {
            DataTable table = new DataTable();
            try
            {
                connect.Open();
                SqlDataAdapter adapter = new SqlDataAdapter(str, connect);
                adapter.Fill(table);
                connect.Close();
                return table;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            return table;
        }
    }
}
