using BookStore.API.Data;
using BookStore.API.Interfaces;
using BookStore.API.Models;
using Microsoft.EntityFrameworkCore;

namespace BookStore.API.Repositories
{
    public class SaleRepository : ISaleRepository
    {
        private readonly BookStoreDbContext _context;

        public SaleRepository(BookStoreDbContext context)
        {
            _context = context;
        }
        public async Task<List<Sale>> GetAllAsync()
        {
            return await _context.Sales
                .Include(x => x.Book)
                .Include(x => x.User)
                .ToListAsync();
        }

        public async Task<Sale?> GetByIdAsync(int id)
        {
            return await _context.Sales
                .Include(x => x.Book)
                .Include(x => x.User)
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Sale> AddAsync(Sale sale)
        {
            await _context.Sales.AddAsync(sale);

            await _context.SaveChangesAsync();
            return sale;
        }

        public async Task<Sale> UpdateAsync(Sale sale)
        {
            _context.Sales.Update(sale);
            await _context.SaveChangesAsync();

            return sale;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var sales = await _context.Sales.FindAsync(id);

            if (sales == null) return false;

            _context.Sales.Remove(sales);

            return await _context.SaveChangesAsync() > 0;
        }
    }
}
