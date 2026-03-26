namespace CRUD_Final.Models
{
    public class TourTB
    {
        public int id { get; set; }
        public string Tour_Name { get; set; }
        public string Destination { get; set; }

        public int DurationInDays { get; set; }

        public float Price { get; set; }

        public float is_Avillable { get; set; }
    }
}
