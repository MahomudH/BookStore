using System.ComponentModel.DataAnnotations;

namespace BookStore.API.DTOs.Sale
{
    public class CreateSaleInput
    {
        [Required]
        public int BookId { get; set; }
        [Required]
        public int Amount { get; set; }
        public DateTime OrderDate { get { return DateTime.Now; } }
        [Required]
        public double TotalPrice { get; set; }
    }
}
