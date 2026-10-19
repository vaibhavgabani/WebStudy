using Microsoft.Data.SqlClient;
using System.Data;
using System.Security.Cryptography.Pkcs;

namespace CRUD.Controllers
{
    public class ConnectionDB
    {
        public SqlConnection connection = new SqlConnection("Data Source=(LocalDB)\\MSSQLLocalDB;AttachDbFilename=C:\\Users\\gaban\\OneDrive\\Documents\\CRUD.mdf;Integrated Security=True;Connect Timeout=30");

        public ConnectionDB() {

            try
            {
                connection.Open();
                connection.Close();
            }
            catch (Exception ex)
            { 
                Console.WriteLine(ex.Message);
            }
            connection.Close();
        }

        public bool iud(String str) {
            try
            {
                connection.Open();
                SqlCommand cmd = new SqlCommand(str, connection);
                cmd.ExecuteNonQuery();
                connection.Close();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return false;
        }

        public DataTable select(String str) {
            DataTable dt = new DataTable();
            try
            {
                connection.Open();
                SqlDataAdapter da = new SqlDataAdapter(str, connection);
                da.Fill(dt);
                connection.Close();
                return dt;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return dt;
        }
    }
}
