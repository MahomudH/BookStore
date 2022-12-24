using BookStore.API.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookStore.API.DTOs.Sale
{
    public class SaleDto
    {
        public int Id { get; set; }
        public float Amount { get; set; }
        public DateTime OrderDate { get; set; }
        public float TotalPrice { get; set; }
        public string UserId { get; set; }
        public int BookId { get; set; }
    }
}
