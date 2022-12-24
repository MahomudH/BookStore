namespace BookStore.API.DTOs.Publishers
{
    public class UpdatePublisherInput
    {
        public int  Id { get; set; }
        public string Name { get; set; }
        public IFormFile Logo { get; set; }
    }
}
