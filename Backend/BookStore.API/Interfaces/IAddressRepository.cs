using BookStore.API.Models;

namespace BookStore.API.Interfaces
{
    public interface IAddressRepository
    {
        Task<List<Address>> GetAllAsync();
        Task<Address?> GetByIdAsync(int id);
        Task<Address> AddAsync(Address address);
        Task<Address> UpdateAsync( Address newAddress);
        Task<bool> DeleteAsync(int id);
    }
}
