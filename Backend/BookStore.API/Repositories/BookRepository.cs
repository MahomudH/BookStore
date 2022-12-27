using BookStore.API.Data;
using BookStore.API.Interfaces;
using BookStore.API.Models;
using Microsoft.EntityFrameworkCore;

namespace BookStore.API.Repositories
{
    public class BookRepository:IBookRepository
    {
        private readonly BookStoreDbContext _context;

        public BookRepository(BookStoreDbContext context)
        {
            _context = context;
        }
        public async Task<List<Book>> GetAllAsync(string filter="")
        {
            return await _context.Books
                .OrderByDescending(x => x.Id)
                .Include(x => x.TranslatorFk)
                .Include(x => x.AuthorFk)
                .Include(x => x.CategoryFk)
                .Include(x => x.PublisherFk)
                .Where(x => x.Name.Contains(filter) || x.AuthorFk.Name.Contains(filter))
                .ToListAsync();
        }

        public async Task<Book?> GetByIdAsync(int id)
        {
            return await _context.Books
                .Include(x => x.TranslatorFk)
                .Include(x => x.AuthorFk)
                .Include(x => x.CategoryFk)
                .Include(x => x.PublisherFk)
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Book> AddAsync(Book book)
        {
            await _context.Books.AddAsync(book);
            await _context.SaveChangesAsync();
            return book;
        }

        public async Task<Book> UpdateAsync( Book book)
        {
            var foundBook = await _context.Books.FindAsync(book.Id);

            if (foundBook == null) throw new Exception("Book was not found!");

            _context.Books.Update(foundBook);
            await _context.SaveChangesAsync();

            return foundBook;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var book = await _context.Books.FindAsync(id);
            if (book == null) return false;
            _context.Books.Remove(book);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<List<Book>> GetLastSixBooks()
        {
            return await _context.Books
                .OrderByDescending(x => x.Id)
                .Take(6)
                .Include(x => x.TranslatorFk)
                .Include(x => x.AuthorFk)
                .Include(x => x.CategoryFk)
                .Include(x => x.PublisherFk)
                .ToListAsync();
        }

    }
}
