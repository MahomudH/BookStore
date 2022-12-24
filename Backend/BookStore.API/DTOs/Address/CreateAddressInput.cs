using System.ComponentModel.DataAnnotations.Schema;

namespace BookStore.API.DTOs.Address
{
    public class CreateAddressInput
    {
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string PostalCode { get; set; }
        public int ZoneId { get; set; }
    }
}
