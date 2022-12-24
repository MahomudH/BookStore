using System.ComponentModel.DataAnnotations.Schema;

namespace BookStore.API.Models
{
    public class Sale
    {
        public int Id { get; set; }
        public float Amount { get; set; }
        public DateTime OrderDate { get; set; }
        public float TotalPrice { get; set; }
        [ForeignKey("User")]
        public string UserId { get; set; }
        public AppUser User { get; set; }
        [ForeignKey("Book")]
        public int BookId { get; set; }
        public Book Book { get; set; }
    }
}
