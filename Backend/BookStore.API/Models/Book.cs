using System.ComponentModel.DataAnnotations.Schema;

namespace BookStore.API.Models
{
    [Table("Books")]
    public class Book
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public decimal? Discount { get; set; }
        public string Image { get; set; }
        public string About { get; set; }
        public DateTime PublishYear { get; set; }
        public int PageCount { get; set; }
       
        [ForeignKey("AuthorFk")]
        public int AuthorId { get; set; }
        public Author AuthorFk { get; set; }
        [ForeignKey("PublisherFk")]
        public int PublisherId { get; set; }
        public Publisher PublisherFk { get; set; }
        [ForeignKey("TranslatorFk")]
        public int? TranslatorId { get; set; }
        public Translator? TranslatorFk { get; set; }
        [ForeignKey("CategoryFk")]
        public int CategoryId { get; set; }
        public Category CategoryFk { get; set; }
       
       
    }
}
