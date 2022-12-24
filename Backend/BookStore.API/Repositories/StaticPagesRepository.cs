using BookStore.API.Data;
using BookStore.API.Interfaces;
using BookStore.API.Models;
using Microsoft.EntityFrameworkCore;

namespace BookStore.API.Repositories
{
    public class StaticPagesRepository : IStaticPageRepository
    {
        private readonly BookStoreDbContext _context;

        public StaticPagesRepository(BookStoreDbContext context)
        {
            _context = context;
        }

        public async Task<List<StaticPage>> GetAllAsync()
        {
            return await _context.StaticPages.ToListAsync();
        }

        public async Task<StaticPage?> GetByIdAsync(int id)
        {
            return await _context.StaticPages.FindAsync(id);
        }

        public async Task<StaticPage> AddAsync(StaticPage staticPage)
        {
            await _context.StaticPages.AddAsync(staticPage);
            await _context.SaveChangesAsync();
            return staticPage;
        }

        public async Task<StaticPage> Update(StaticPage staticPage)
        {
            _context.StaticPages.Update(staticPage);
            await _context.SaveChangesAsync();
            return staticPage;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var staticPage = await _context.StaticPages.FindAsync(id);
            if (staticPage == null) return false;
            _context.StaticPages.Remove(staticPage);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
