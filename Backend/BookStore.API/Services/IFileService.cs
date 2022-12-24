namespace BookStore.API.Services
{
    public interface IFileService
    {
        Task ResizeImage(string filePath, string uploadedFolder, string fileName);
        Task<string> SaveFile(IFormFile file, string folderName);
    }
}
