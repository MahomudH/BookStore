namespace BookStore.API.DTOs.Sale
{
    public class UpdateSaleInput
    {
        public int Id { get; set; }
        public float Amount { get; set; }
        public float TotalPrice { get; set; }
        public string UserId { get; set; }
        public int BookId { get; set; }
    }
}
