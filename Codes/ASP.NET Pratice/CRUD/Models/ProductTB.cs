using System.ComponentModel.DataAnnotations;

namespace CRUD.Models
{
    public class ProductTB
    {
        
        public int id { get; set; }
        
        [Required]
        [MinLength(3,ErrorMessage ="Min 3 Chars")]
        [MaxLength(20, ErrorMessage = "Mix 20 Chars")]
        public String name { get; set; }

        [Required]
        [Range(1,100000,ErrorMessage = "Min 1 and max 100000 price")]
        public float price { get; set; }

        [Required]
        [Range(1, 100, ErrorMessage = "Min 1 and max 100 qty")]
        public float qty { get; set; }
    }
}
