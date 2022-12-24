namespace BookStore.API.DTOs.Publishers
{
    public class CreatePublisherInput
    {
        public string Name { get; set; }
        public IFormFile Logo { get; set; }
    }
}
