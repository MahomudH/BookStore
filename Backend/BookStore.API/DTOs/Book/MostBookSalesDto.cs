namespace BookStore.API.DTOs.Book
{
    public class MostBookSalesDto
    {
        public string Name { get; set; }
        public decimal Price { get; set; }
        public decimal? Discount { get; set; }
        public string Image { get; set; }
        public string About { get; set; }
        public DateTime PublishYear { get; set; }
        public int PageCount { get; set; }
        public int AuthorId { get; set; }
        public string AuthorName { get; set; }
        public int PublisherId { get; set; }
        public string PublisherName { get; set; }
        public int? TranslatorId { get; set; }
        public string TranslatorName { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public float Amount { get; set; }
    }
}
