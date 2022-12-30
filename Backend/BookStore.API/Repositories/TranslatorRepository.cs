using BookStore.API.Data;
using BookStore.API.Interfaces;
using BookStore.API.Models;
using Microsoft.EntityFrameworkCore;

namespace BookStore.API.Repositories
{
    public class TranslatorRepository:ITranslatorRepository
    {
        private readonly BookStoreDbContext _context;

        public TranslatorRepository(BookStoreDbContext context)
        {
            _context = context;
        }
        public async Task<List<Translator>> GetAllAsync()
        {
            return await _context.Translators
                .OrderBy(x=> x.Name)
                .ToListAsync();
        }

        public async Task<Translator?> GetByIdAsync(int id)
        {
            return await _context.Translators.FindAsync(id);
        }

        public async Task<Translator> AddAsync(Translator translator)
        {
            await _context.Translators.AddAsync(translator);
            await _context.SaveChangesAsync();
            return translator;
        }

        public async Task<Translator> UpdateAsync(Translator translator)
        {
            var foundTranslator = await _context.Translators.FindAsync(translator.Id);

            if (foundTranslator == null) throw new Exception("Translator not found!");

            _context.Translators.Update(foundTranslator);
            await _context.SaveChangesAsync();

            return foundTranslator;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var translator = await _context.Translators.FindAsync(id);

            if (translator == null) return false;

            _context.Translators.Remove(translator);

            return await _context.SaveChangesAsync() > 0;
        }
    }
}
