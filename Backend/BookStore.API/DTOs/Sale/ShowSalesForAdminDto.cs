using BookStore.API.Models;

namespace BookStore.API.DTOs.Sale
{
    public class ShowSalesForAdminDto
    {
        public int Id { get; set; }
        public float Amount { get; set; }
        public DateTime OrderDate { get; set; }
        public float TotalPrice { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }
        public int BookId { get; set; }
        public string BookName { get; set; }
        public string BookImage { get; set; }
        public int BookPrice { get; set; }
        public SaleStatusEnum SaleStatus { get; set; }
        public DateTime SoldDate { get; set; }
    }
}
