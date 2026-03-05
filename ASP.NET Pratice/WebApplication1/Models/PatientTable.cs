using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    public class PatientTable
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PatientId { get; set; }

        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public virtual UserTable User { get; set; }

        [DataType(DataType.Date)]
        public DateTime DateOfBirth { get; set; }

        public string PastRecords { get; set; } // Stores history [cite: 9]
        public string ContactInfo { get; set; }
    }
}
