using BookStore.API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BookStore.API.Data
{
    public class BookStoreDbContext : IdentityDbContext<AppUser>
    {
        public BookStoreDbContext(DbContextOptions<BookStoreDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<UserFavs>().HasKey(x => new { x.BookId, x.UserId });
            builder.Entity<IdentityRole>()
                .HasData(new IdentityRole { Name = "Admin", NormalizedName = "ADMIN" });
            builder.Entity<IdentityRole>()
                .HasData(new IdentityRole { Name = "User", NormalizedName = "USER" });
            base.OnModelCreating(builder);
        }

        public DbSet<AppUser> AppUsers { get; set; }
        public DbSet<Publisher> Publishers{ get; set; }
        public DbSet<Category> Categories{ get; set; }
        public DbSet<Author> Authors{ get; set; }
        public DbSet<Translator> Translators{ get; set; }
        public DbSet<Book> Books{ get; set; }
        public DbSet<BookSuggestion> BookSuggestions{ get; set; }
        public DbSet<StaticPage> StaticPages{ get; set; }
        public DbSet<ContactUs> ContactUs{ get; set; }
        public DbSet<Zone> Zones { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<Sale> Sales { get; set; }
        public DbSet<BookReview> BookReviews { get; set; }
        public DbSet<UserFavs> UserFavss { get; set; }
        
    }
}
