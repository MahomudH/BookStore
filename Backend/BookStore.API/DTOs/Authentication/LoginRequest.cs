using System.ComponentModel.DataAnnotations;

namespace BookStore.API.DTOs.Authentication
{
    public class LoginRequest
    {
        [Required]
        public string email { get; set; }
        [Required]
        public string password { get; set; }
    }
}
