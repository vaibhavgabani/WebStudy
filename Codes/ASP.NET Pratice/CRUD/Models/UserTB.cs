using Microsoft.DotNet.Scaffolding.Shared.Messaging;
using System.ComponentModel.DataAnnotations;

namespace CRUD.Models
{
    public class UserTB
    {
        public int id { get; set; }
        public string name { get; set; }
        [Required]
        public string email { get; set; }
        
        [Required]
        [MinLength(3, ErrorMessage = "Min 3 chars")]
        //[RegularExpression(@"()",ErrorMessage ="Min 3 Char")]
        [MaxLength(10,ErrorMessage ="Max 10 chars")]
        public string password { get; set; }

    }
}
