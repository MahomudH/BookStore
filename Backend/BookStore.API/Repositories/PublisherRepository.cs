using BookStore.API.Data;
using BookStore.API.Interfaces;
using BookStore.API.Models;
using Microsoft.EntityFrameworkCore;

namespace BookStore.API.Repositories
{
    public class PublisherRepository:IPublisherRepository
    {
        private readonly BookStoreDbContext _context;

        public PublisherRepository(BookStoreDbContext context)
        {
            _context = context;
        }
        public async Task<List<Publisher>> GetAllAsync()
        {
            return await _context.Publishers
                .OrderBy(x => x.Name)
                .ToListAsync();
        }

        public async Task<Publisher?> GetByIdAsync(int id)
        {
            return await _context.Publishers.FindAsync(id);
        }

        public async Task<Publisher> AddAsync(Publisher publisher)
        {
            await _context.Publishers.AddAsync(publisher);
            await _context.SaveChangesAsync();
            return publisher;
        }

        public async Task<Publisher> UpdateAsync( Publisher publisher)
        {
            var foundPublisher = await _context.Publishers.FindAsync(publisher.Id);

            if (foundPublisher == null) throw new Exception("Publisher not found!");

            _context.Publishers.Update(foundPublisher);
            await _context.SaveChangesAsync();

            return foundPublisher;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var publisher = await _context.Publishers.FindAsync(id);

            if (publisher == null) return false;

            _context.Publishers.Remove(publisher);

            return await _context.SaveChangesAsync() > 0;
        }
    }
}
