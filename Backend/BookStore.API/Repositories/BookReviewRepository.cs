using BookStore.API.Data;
using BookStore.API.Interfaces;
using BookStore.API.Models;
using Microsoft.EntityFrameworkCore;

namespace BookStore.API.Repositories
{
    public class BookReviewRepository:IBookReviewRepository
    {
        private readonly BookStoreDbContext _context;

        public BookReviewRepository(BookStoreDbContext context)
        {
            _context = context;
        }
        public async Task<List<BookReview>> GetAllAsync()
        {
            return await _context.BookReviews.ToListAsync();
        }

        public async Task<BookReview?> GetByIdAsync(int id)
        {
            return await _context.BookReviews.FindAsync(id);
        }

        public async Task<BookReview> AddAsync(BookReview bookReview)
        {
            await _context.BookReviews.AddAsync(bookReview);
            await _context.SaveChangesAsync();
            return bookReview;
        }

        public async Task<BookReview> UpdateAsync( BookReview bookReview)
        {
            var foundBookReview = await _context.BookReviews.FindAsync(bookReview.Id);

            if (foundBookReview == null) throw new Exception("Book Review not found!");

            _context.BookReviews.Update(foundBookReview);
            await _context.SaveChangesAsync();

            return foundBookReview;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var bookReviews = await _context.BookReviews.FindAsync(id);
            if (bookReviews == null) return false;
            _context.BookReviews.Remove(bookReviews);

            return await _context.SaveChangesAsync() > 0;
        }
    }
}
