using BookStore.API.Models;

namespace BookStore.API.Interfaces
{
    public interface IBookReviewRepository
    {
        Task<List<BookReview>> GetAllAsync();
        Task<BookReview?> GetByIdAsync(int id);
        Task<BookReview> AddAsync(BookReview bookReview);
        Task<BookReview> UpdateAsync(BookReview bookReview);
        Task<bool> DeleteAsync(int id);
    }
}
