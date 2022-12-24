using System.Runtime.Serialization;
using Mapster;

namespace BookStore.API.DTOs.Publishers
{
    public class PublisherDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        [AdaptIgnore]
        public string Logo { get; set; }
    }
}
