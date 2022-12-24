using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;

namespace BookStore.API.Services
{
    public class FileService : IFileService
    {
        private readonly IWebHostEnvironment _env;

        public FileService(IWebHostEnvironment env) 
        {
            _env = env;
        }

        public async Task ResizeImage(string filePath, string uploadedFolder, string fileName)
        {
            var folderMedi = Path.Combine(uploadedFolder, "Thumbs", "Med", fileName);
            var folderSmall = Path.Combine(uploadedFolder, "Thumbs", "Small", fileName);

            using (Image input = Image.Load(filePath))
            {

                input.Mutate(x => x.Resize(new ResizeOptions { Mode = ResizeMode.Crop, Size = new Size(400, 400) }));
                await input.SaveAsync(folderMedi);

                input.Mutate(x => x.Resize(new ResizeOptions { Mode = ResizeMode.Crop, Size = new Size(120, 120) }));
                await input.SaveAsync(folderSmall);

            }

        }

        public async Task<string> SaveFile(IFormFile file, string folderName)
        {
            string fileName = null;
            string uploads = null;

            if (file != null && file.Length > 0)
            {
                uploads = Path.Combine(_env.WebRootPath, folderName);

                fileName = Guid.NewGuid().ToString().Replace("-", "") + Path.GetExtension(file.FileName);

                await using var fileStream = new FileStream(Path.Combine(uploads, fileName), FileMode.Create);
                await file.CopyToAsync(fileStream);

            }

            string filePath = Path.Combine(uploads, fileName);

            await ResizeImage(filePath, uploads, fileName);

            return fileName;
        }


    }
}
