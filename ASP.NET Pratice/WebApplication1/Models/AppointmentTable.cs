using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    public class AppointmentTable
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int AppointmentId { get; set; }

        public int? PatientId { get; set; } // Matches nullable INT in SQL
        [ForeignKey("PatientId")]
        public virtual PatientTable Patient { get; set; }

        public int? DoctorId { get; set; } // Matches nullable INT in SQL
        [ForeignKey("DoctorId")]
        public virtual DoctorTable Doctor { get; set; }

        [Required]
        [DataType(DataType.Date)]
        public DateTime AppointmentDate { get; set; } // Used for date-wise lists

        [Required]
        public string AppointmentTime { get; set; } // NEW: Matches missing column in DB

        public string Status { get; set; } = "Pending";
    }
}