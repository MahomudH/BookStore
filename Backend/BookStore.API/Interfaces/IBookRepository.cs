using BookStore.API.Models;

namespace BookStore.API.Interfaces
{
    public interface IBookRepository
    {
        Task<List<Book>> GetAllAsync(string filter);
        Task<Book?> GetByIdAsync(int id);
        Task<Book> AddAsync(Book book);
        Task<Book> UpdateAsync( Book book);
        Task<bool> DeleteAsync(int id);
        Task<List<Book>> GetLastSixBooks();

    }
}
