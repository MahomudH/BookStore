using System.ComponentModel.DataAnnotations.Schema;

namespace BookStore.API.Models
{
    [Table("Addresses")]
    public class Address
    {
        public int Id { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string PostalCode { get; set; }
        [ForeignKey("Zone")]
        public int ZoneId { get; set; }
        public Zone Zone { get; set; }
     
    }
}
