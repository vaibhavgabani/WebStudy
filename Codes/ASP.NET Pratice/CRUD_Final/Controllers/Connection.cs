using Microsoft.Data.SqlClient;
using System.Data;

namespace CRUD_Final.Controllers
{
    public class Connection
    {
        SqlConnection connection = new SqlConnection("Data Source=(LocalDB)\\MSSQLLocalDB;AttachDbFilename=C:\\Users\\gaban\\OneDrive\\Documents\\CRUD_Final.mdf;Integrated Security=True;Connect Timeout=30");
        SqlCommand command;

        public Connection() {
            try
            {
                connection.Open();
                connection.Close();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message.ToString());
            }
            finally
            {
                connection.Close();
            }
        }

        public Boolean IUD(String str) {
            try
            {
                connection.Open();
                command = new SqlCommand(str,connection);
                command.ExecuteNonQuery();
                connection.Close();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message.ToString());
            }
            finally
            {
                connection.Close();
            }
            return false;
        }


        public DataTable Select(String str) {
            DataTable tb = new DataTable();
            try
            {
                connection.Open();
                SqlDataAdapter adp = new SqlDataAdapter(str,connection);
                adp.Fill(tb);
                connection.Close();
                return tb;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message.ToString());
            }
            finally
            {
                connection.Close();
            }
            return tb;
        }

        public void InsertCustomerUsingProcedure() {
            try
            {
                connection.Open();
                command = new SqlCommand("InsertCustomerProcedure", connection);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@Customer_Name", "Abhay Savani");
                command.Parameters.AddWithValue("@Email_Id", "abhay@gmail.com");
                command.Parameters.AddWithValue("@Password", "Abhay@2026");
                command.Parameters.AddWithValue("@Age", 21);
                command.Parameters.AddWithValue("@Address", "Surat, Gujarat");
                command.ExecuteNonQuery();
                connection.Close();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message.ToString());
            }
            finally
            {
                connection.Close();
            }
        }

        public DataTable DispalyUserByid(int id) {
            DataTable dt = new DataTable();
            try
            {
                connection.Open();
                command = new SqlCommand("SelectById",connection);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@id", id);
                SqlDataAdapter adp = new SqlDataAdapter(command);
                adp.Fill(dt);
                connection.Close();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message.ToString());
            }
            finally
            {
                connection.Close();
            }
            return dt;
        }
    }
}
