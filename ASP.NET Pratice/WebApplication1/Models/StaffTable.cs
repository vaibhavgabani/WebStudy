using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    public class StaffTable
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int StaffId { get; set; }

        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public virtual UserTable User { get; set; }

        public string Department { get; set; }
    }
}
