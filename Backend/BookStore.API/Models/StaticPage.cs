using System.ComponentModel.DataAnnotations.Schema;

namespace BookStore.API.Models
{
    [Table("StaticPages")]
    public class StaticPage
    {
        public int Id { get; set; }
        public string PageName { get; set; }
        public string Details { get; set; }
    }
}
