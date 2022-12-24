using System.ComponentModel.DataAnnotations;

namespace BookStore.API.DTOs.BookReview
{
    public class CreateBookReviewInput
    {
        public string UserId { get; set; }
        public int BookId { get; set; }
        public string Comment { get; set; }
        [Range(0, 5)]
        public int Rate { get; set; }
    }
}
