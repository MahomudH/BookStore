using BookStore.API.Data;
using BookStore.API.Interfaces;
using BookStore.API.Models;
using Microsoft.EntityFrameworkCore;

namespace BookStore.API.Repositories
{
    public class AddressRepository : IAddressRepository
    {
        private readonly BookStoreDbContext _context;

        public AddressRepository(BookStoreDbContext context)
        {
            _context = context;
        }
        public async Task<List<Address>> GetAllAsync()
        {
            return await _context.Addresses.ToListAsync();
        }

        public async Task<Address?> GetByIdAsync(int id)
        {
            return await _context.Addresses.FindAsync(id);
        }

        public async Task<Address> AddAsync(Address address)
        {
            var result = await _context.Addresses.AddAsync(address);
            await _context.SaveChangesAsync();
            return result.Entity;
        }

        public async Task<Address> UpdateAsync(Address address)
        {
            var foundAddress = await _context.Addresses.FindAsync(address.Id);

            if (foundAddress == null) throw new Exception("Address not found!");
            
            foundAddress.ZoneId = address.ZoneId;
            foundAddress.Address1 = address.Address1;
            foundAddress.Address2 = address.Address2;
            foundAddress.PostalCode = address.PostalCode;   

            _context.Addresses.Update(foundAddress);

            await _context.SaveChangesAsync();

            return foundAddress;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var address = await _context.Addresses.FindAsync(id);
            if (address == null) return false;
            _context.Addresses.Remove(address);

            return await _context.SaveChangesAsync() > 0;
        }
    }
}
