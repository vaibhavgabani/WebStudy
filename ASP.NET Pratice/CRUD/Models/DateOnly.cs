using System;

namespace CRUD.Models
{
    public class DateInputModel
    {
        // Removed [Key]
        public int id { get; set; }

        // Removed [Required], [DataType], and [DisplayFormat]
        public DateTime? date { get; set; }

        // Removed [Required], [DataType], and [DisplayFormat]
        public DateTime? datewithtime { get; set; }
    }
}