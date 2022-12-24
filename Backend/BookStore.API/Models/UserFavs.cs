using System.ComponentModel.DataAnnotations.Schema;

namespace BookStore.API.Models
{
    public class UserFavs
    {
        [ForeignKey("User")]
        public string UserId { get; set; }
        public AppUser User { get; set; }
        [ForeignKey("Book")]
        public int BookId { get; set; }
        public Book Book { get; set; }
    }
}
