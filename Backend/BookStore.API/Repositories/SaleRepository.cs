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
                .OrderByDescending(x => x.OrderDate)
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

        public async Task<List<Sale>> GetAllSalesForUser(string userId)
        {
            return  await _context.Sales
                .Where(x => x.UserId == userId)
                .Where(x => x.SaleStatus == SaleStatusEnum.Requested)
                .Include(x => x.Book)
                .OrderByDescending(x => x.OrderDate)
                .ToListAsync();
        }

        public async Task<List<Sale>> GetAllOrdersForUser(string userId)
        {
            return  await _context.Sales
                .Where(x => x.UserId == userId)
                .Where(x => x.SaleStatus != SaleStatusEnum.Requested)
                .Include(x => x.Book)
                .OrderByDescending(x => x.OrderDate)
                .ToListAsync();
        }

        public async Task AgreeSold(int saleId)
        {
            var sale = await _context.Sales.FirstOrDefaultAsync(x => x.Id == saleId);
            sale.SaleStatus = SaleStatusEnum.Sold;
            sale.SoldDate=DateTime.Now;
            await _context.SaveChangesAsync();
        }

        public async Task RejectSold(int saleId)
        {
            var sale = await _context.Sales.FirstOrDefaultAsync(x => x.Id == saleId);
            sale.SaleStatus = SaleStatusEnum.Rejected;
            sale.SoldDate=DateTime.Now;
            await _context.SaveChangesAsync();
        }
    }
}
