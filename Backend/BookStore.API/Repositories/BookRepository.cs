using BookStore.API.Data;
using BookStore.API.DTOs.Book;
using BookStore.API.Interfaces;
using BookStore.API.Models;
using MapsterMapper;
using Microsoft.EntityFrameworkCore;

namespace BookStore.API.Repositories
{
    public class 
        BookRepository : IBookRepository
    {
        private readonly BookStoreDbContext _context;
        private readonly IMapper _mapper;

        public BookRepository(BookStoreDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<List<Book>> GetAllAsync(string filter)
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

        public async Task<Book> UpdateAsync(Book book)
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

        public async Task<MostBookSalesDto> GetTheMostSoldBook()
        {
            var result = await _context.Sales
                .Where(x=> x.SaleStatus == SaleStatusEnum.Sold)
                .GroupBy(x => x.BookId)
                .Select(x => new
                {
                    BookId = x.Key,
                    TotalAmount = x.Sum(s => s.Amount)
                })
                .OrderByDescending(x => x.TotalAmount)
                .FirstOrDefaultAsync();

            var book = new Book();

            if (result != null)
            {
                 book = await GetByIdAsync(result.BookId);
                 var output = _mapper.Map<MostBookSalesDto>(book);
                 output.Amount = result.TotalAmount;

                 return output;
            }
            else
            {
                 book = await _context.Books.OrderByDescending(x => x.Id).FirstOrDefaultAsync();

                 var output = _mapper.Map<MostBookSalesDto>(book);
                 output.Amount = 0;

                 return output;
            }

        }

        public async Task<MostBookSalesDto> GetTheMostOrderBook()
        {
            var result = await _context.Sales
                //.Where(x => x.SaleStatus != SaleStatusEnum.Sold)
                .GroupBy(x => x.BookId)
                .Select(x => new
                {
                    BookId = x.Key,
                    TotalAmount = x.Sum(s => s.Amount)
                })
                .OrderByDescending(x => x.TotalAmount)
                .FirstOrDefaultAsync();

            var book = new Book();

            if (result != null)
            {
                book = await GetByIdAsync(result.BookId);
                var output = _mapper.Map<MostBookSalesDto>(book);
                output.Amount = result.TotalAmount;

                return output;
            }
            else
            {
                book = await _context.Books.OrderByDescending(x => x.Id).FirstOrDefaultAsync();

                var output = _mapper.Map<MostBookSalesDto>(book);
                output.Amount = 0;

                return output;
            }

        }
    }
}
