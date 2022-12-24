using BookStore.API.Models;

namespace BookStore.API.Interfaces
{
    public interface ICategoryRepository
    {
        Task<List<Category>> GetAllAsync();
        Task<Category?> GetByIdAsync(int id);
        Task<Category> AddAsync(Category category);
        Task<Category> UpdateAsync( Category category);
        Task<bool> DeleteAsync(int id);
    }
}
