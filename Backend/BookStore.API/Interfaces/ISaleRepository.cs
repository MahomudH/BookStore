using BookStore.API.Models;

namespace BookStore.API.Interfaces
{
    public interface ISaleRepository
    {
        Task<List<Sale>> GetAllAsync();
        Task<Sale?> GetByIdAsync(int id);
        Task<Sale> AddAsync(Sale sale);
        Task<Sale> UpdateAsync(Sale sale);
        Task<bool> DeleteAsync(int id);
        Task<List<Sale>> GetAllSalesForUser(string userId);
        Task<List<Sale>> GetAllOrdersForUser(string userId);
        Task<int> GetNumberOfAllOrdersForUser(string userId);
        Task AgreeSold(int saleId);
        Task RejectSold(int saleId);
    }
}
