namespace CRUD_Final.Models
{
    public class BookingTB
    {
        public int id { get; set; }

        public int Customer_Id { get; set; }

        public int Tour_Id { get; set; }

        public string Booking_Date { get; set; }

        public int Total_Person { get; set; }

        public double Total_Amount { get; set; }
    }
}
