using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    public class DoctorTable
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int DoctorId { get; set; }

        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public virtual UserTable User { get; set; }

        public string Specialization { get; set; }
        public string Availability { get; set; } // Set schedule date/time 
        public string ProfileDetails { get; set; } // Viewable by patients [cite: 10]
    }
}
