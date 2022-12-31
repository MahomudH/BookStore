using BookStore.API.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookStore.API.DTOs.Sale
{
    public class ShowSalesForUserDto
    {
        public int Id { get; set; }
        public float Amount { get; set; }
        public DateTime OrderDate { get; set; }
        public float TotalPrice { get; set; }
        public int BookId { get; set; }
        public string BookName { get; set; }
        public decimal BookPrice { get; set; }
        public string BookImage { get; set; }
        public SaleStatusEnum SaleStatus { get; set; }
        public DateTime SoldDate { get; set; }

    }
}
