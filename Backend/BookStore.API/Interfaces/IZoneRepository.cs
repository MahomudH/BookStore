using BookStore.API.Models;

namespace BookStore.API.Interfaces
{
    public interface IZoneRepository
    {
        Task<List<Zone>> GetAllAsync();
        Task<Zone?> GetByIdAsync(int id);
        Task<Zone> AddAsync(Zone zone);
        Task<Zone> UpdateAsync(Zone zone);
        Task<bool> DeleteAsync(int id);
    }
}
