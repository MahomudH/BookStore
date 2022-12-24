using System.ComponentModel.DataAnnotations.Schema;

namespace BookStore.API.Models
{
    [Table("Zones")]
    public class Zone
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
