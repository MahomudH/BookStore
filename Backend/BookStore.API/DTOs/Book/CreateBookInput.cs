using Mapster;

namespace BookStore.API.DTOs.Book
{
    public class CreateBookInput
    {
        public string Name { get; set; }
        public decimal Price { get; set; }
        public decimal? Discount { get; set; }
        [AdaptIgnore]
        public IFormFile Image { get; set; }
        public string About { get; set; }
        public int PageCount { get; set; }
        public int AuthorId { get; set; }
        public int PublisherId { get; set; }
        public int? TranslatorId { get; set; }
        public int CategoryId { get; set; }
    
    }
}
