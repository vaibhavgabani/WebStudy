using System.ComponentModel.DataAnnotations;

namespace CRUD_Final.Models
{
    public class CustomerTB
    {
        public int id { get; set; }

        public string Customer_Name { get; set; }

        [Required]
        public string Email_id { get; set; }

        [Required]
        [Range(3,50,ErrorMessage = "Passowrd Musr be in Rangle of 3 to 50")]
        public string Password { get; set; }

        public string Age { get; set; }

        public string Address { get; set; }
    }
}
