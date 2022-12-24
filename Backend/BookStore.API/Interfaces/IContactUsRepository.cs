using BookStore.API.Models;

namespace BookStore.API.Interfaces
{
    public interface IContactUsRepository
    {
        Task<List<ContactUs>> GetAll();
        Task<ContactUs?> GetById(int id);
        Task<ContactUs> Add(ContactUs contactUs);
        Task<ContactUs> Update(int id, ContactUs contactUs);
        Task<bool> Delete(int id);
    }
}
