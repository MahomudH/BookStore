using BookStore.API.Models;

namespace BookStore.API.Interfaces
{
    public interface IUserFavsRepository
    {
        Task<List<UserFavs>> GetAllAsync();
        Task<UserFavs> GetByIdAsync(int id);
        Task<UserFavs> AddAsync(UserFavs userFavs);
        Task<UserFavs> UpdateAsync(UserFavs userFavs);
        Task<bool> DeleteAsync(int id);
    }
}
