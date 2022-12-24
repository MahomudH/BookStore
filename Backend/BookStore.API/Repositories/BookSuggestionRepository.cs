using BookStore.API.Data;
using BookStore.API.Interfaces;
using BookStore.API.Models;
using Microsoft.EntityFrameworkCore;

namespace BookStore.API.Repositories
{
    public class BookSuggestionRepository:IBookSuggestionRepository
    {
        private readonly BookStoreDbContext _context;

        public BookSuggestionRepository(BookStoreDbContext context)
        {
            _context = context;
        }
        public async Task<List<BookSuggestion>> GetAllBooks()
        {
            return await _context.BookSuggestions.ToListAsync();
        }

        public async Task<BookSuggestion?> GetById(int id)
        {
            return await _context.BookSuggestions.FindAsync(id);
        }

        public async Task<BookSuggestion> Add(BookSuggestion book)
        {
            await _context.BookSuggestions.AddAsync(book);
            await _context.SaveChangesAsync();
            return book;
        }

        public Task<BookSuggestion> Update(int id, BookSuggestion bookSuggestion)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> Delete(int id)
        {
            var bookSuggestion = await _context.BookSuggestions.FindAsync(id);
            if (bookSuggestion == null) return false;
            _context.BookSuggestions.Remove(bookSuggestion);

            return await _context.SaveChangesAsync() > 0;
        }
    }
}
