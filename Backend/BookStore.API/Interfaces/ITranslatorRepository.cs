using BookStore.API.Models;

namespace BookStore.API.Interfaces
{
    public interface ITranslatorRepository
    {
        Task<List<Translator>> GetAllAsync();
        Task<Translator?> GetByIdAsync(int id);
        Task<Translator> AddAsync(Translator translator);
        Task<Translator> UpdateAsync( Translator translator);
        Task<bool> DeleteAsync(int id);
    }
}
