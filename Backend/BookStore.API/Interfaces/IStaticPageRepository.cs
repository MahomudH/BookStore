using BookStore.API.Models;

namespace BookStore.API.Interfaces
{
    public interface IStaticPageRepository
    {
        Task<List<StaticPage>> GetAllAsync();
        Task<StaticPage?> GetByIdAsync(int id);
        Task<StaticPage> AddAsync(StaticPage staticPage);
        Task<StaticPage> Update( StaticPage staticPage);
        Task<bool> DeleteAsync(int id);
    }
}
