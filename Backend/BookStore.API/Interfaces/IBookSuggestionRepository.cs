using BookStore.API.Models;

namespace BookStore.API.Interfaces
{
    public interface IBookSuggestionRepository
    {
        Task<List<BookSuggestion>> GetAllBooks();
        Task<BookSuggestion?> GetById(int id);
        Task<BookSuggestion> Add(BookSuggestion book);
        Task<BookSuggestion> Update(int id, BookSuggestion bookSuggestion);
        Task<bool> Delete(int id);

    }
}
