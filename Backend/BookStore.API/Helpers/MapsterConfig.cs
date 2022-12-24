using BookStore.API.DTOs.Address;
using BookStore.API.DTOs.Authentication;
using BookStore.API.DTOs.Book;
using BookStore.API.DTOs.BookReview;
using BookStore.API.DTOs.Category;
using BookStore.API.DTOs.Publishers;
using BookStore.API.DTOs.StaticPages;
using BookStore.API.DTOs.Translator;
using BookStore.API.DTOs.Zone;
using BookStore.API.Models;
using Mapster;

namespace BookStore.API.Helpers
{
    public class MapsterConfig : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            config.NewConfig<StaticPageDto, StaticPage>().TwoWays();
            config.NewConfig<CreateStaticPage, StaticPage>();
            config.NewConfig<UpdateStaticPagesInput, StaticPage>();

            config.NewConfig<CategoryDto, Category>().TwoWays();
            config.NewConfig<UpdateCategoryInput, Category>();
            config.NewConfig<CreateCategoryInput, Category>();

            config.NewConfig<TranslatorDto, Translator>().TwoWays();
            config.NewConfig<CreateTranslatorInput, Translator>().TwoWays();
            config.NewConfig<UpdateTranslatorInput, Translator>().TwoWays();

            config.NewConfig<PublisherDto, Publisher>().TwoWays();
            config.NewConfig<CreatePublisherInput, Publisher>().Ignore(x => x.Logo);
            config.NewConfig<UpdateStaticPagesInput, Publisher>().Ignore(x => x.Logo);
           
            config.NewConfig<Book, BookDto>()
                .Map(dest => dest.AuthorName, src => src.AuthorFk.Name)
                .Map(dest => dest.PublisherName, src => src.PublisherFk.Name)
                .Map(dest => dest.TranslatorName, src => src.TranslatorFk.Name)
                .Map(dest => dest.CategoryName, src => src.CategoryFk.Name)
                .TwoWays();

            config.NewConfig<CreateBookInput, Book>();

            config.NewConfig<CreateBookReviewInput,BookReview>();

            config.NewConfig<ZoneDto, Zone>().TwoWays();
            config.NewConfig<CreateZoneInput, Zone>();
            config.NewConfig<UpdateZoneInput, Zone>();

            config.NewConfig<CreateAddressInput, Address>().TwoWays();

            config.NewConfig<RegisterRequest, AppUser>()
               .Map(dest => dest.UserName, src => src.Email);

        }
    }
}
