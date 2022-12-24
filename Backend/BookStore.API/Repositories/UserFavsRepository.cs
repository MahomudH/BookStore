
using BookStore.API.Data;
using BookStore.API.Interfaces;
using BookStore.API.Models;

namespace BookStore.API.Repositories
{
    public class UserFavsRepository:IUserFavsRepository
    {
        private readonly BookStoreDbContext _context;

        public UserFavsRepository(BookStoreDbContext context)
        {
            _context = context;
        }
        public Task<List<UserFavs>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public Task<UserFavs> GetByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<UserFavs> AddAsync(UserFavs userFavs)
        {
            throw new NotImplementedException();
        }

        public Task<UserFavs> UpdateAsync(UserFavs userFavs)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var userFavs = await _context.UserFavss.FindAsync(id);

            if (userFavs == null) return false;

            _context.UserFavss.Remove(userFavs);

            return await _context.SaveChangesAsync() > 0;
        }
    }
}
