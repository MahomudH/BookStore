using BookStore.API.Models;

namespace BookStore.API.Interfaces
{
    public interface IPublisherRepository
    {
        Task<List<Publisher>> GetAllAsync();
        Task<Publisher?> GetByIdAsync(int id);
        Task<Publisher> AddAsync(Publisher publisher);
        Task<Publisher> UpdateAsync(Publisher publisher);
        Task<bool> DeleteAsync(int id);
        Task<List<Publisher>> GetLastSixPublisher();
    }
}
