using BookStore.API.Data;
using BookStore.API.Interfaces;
using BookStore.API.Models;
using Microsoft.EntityFrameworkCore;

namespace BookStore.API.Repositories
{
    public class ContactUsRepository:IContactUsRepository
    {
        private readonly BookStoreDbContext _context;

        public ContactUsRepository(BookStoreDbContext context)
        {
            _context = context;
        }
        public async Task<List<ContactUs>> GetAll()
        {
            return await _context.ContactUs.ToListAsync();
        }

        public async Task<ContactUs?> GetById(int id)
        {
            return await _context.ContactUs.FindAsync(id);
        }

        public async Task<ContactUs> Add(ContactUs contactUs)
        {
            await _context.ContactUs.AddAsync(contactUs);
            await _context.SaveChangesAsync();
            return contactUs;
        }

        public Task<ContactUs> Update(int id, ContactUs contactUs)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> Delete(int id)
        {
            var contactUs = await _context.ContactUs.FindAsync(id);

            if (contactUs == null) return false;

            _context.ContactUs.Remove(contactUs);

            return await _context.SaveChangesAsync() > 0;
        }
    }
}
