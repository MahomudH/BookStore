using BookStore.API.Models;

namespace BookStore.API.Interfaces
{
    public interface IAuthorRepository
    {
        Task<List<Author>> GetAllAsync();
        Task<Author?> GetByIdAsync(int id);
        Task<Author> AddAsync(Author author);
        Task<Author> UpdateAsync( Author author);
        Task<bool> DeleteAsync(int id);
    }
}
