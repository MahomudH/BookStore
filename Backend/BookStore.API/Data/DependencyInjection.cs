using BookStore.API.Interfaces;
using BookStore.API.Repositories;
using MapsterMapper;
using Mapster;
using Microsoft.EntityFrameworkCore;
using System.Reflection;
using System.Text;
using BookStore.API.Models;
using BookStore.API.Services;
using BookStore.API.Services.JwtService;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

namespace BookStore.API.Data
{
    public static  class DependencyInjection
    {
        public static IServiceCollection AddDataLayer(this IServiceCollection services, ConfigurationManager configurationManager)
        {
            services.AddDbContext<BookStoreDbContext>(options =>
            {
                options.UseSqlServer(configurationManager.GetConnectionString("DefaultConnection"));
            });

            services.AddScoped<IAuthorRepository, AuthorRepository>();
            services.AddScoped<IAddressRepository, AddressRepository>();
            services.AddScoped<IStaticPageRepository, StaticPagesRepository>();
            services.AddScoped<ICategoryRepository, CategoryRepository>();
            services.AddScoped<ITranslatorRepository, TranslatorRepository>();
            services.AddScoped<IPublisherRepository, PublisherRepository>();
            services.AddScoped<IBookRepository,BookRepository>();
            services.AddScoped<IBookReviewRepository,BookReviewRepository>();
            services.AddScoped<IZoneRepository,ZoneRepository>();
            services.AddScoped<ISaleRepository,SaleRepository>();

            services.AddTransient<IFileService,FileService>();

            services.AddScoped<IJwtTokenGenerator, JwtTokenGenerator>();
            services.AddIdentity<AppUser, IdentityRole>()
                .AddEntityFrameworkStores<BookStoreDbContext>()
                .AddDefaultTokenProviders();

            return services;
        }

        public static IServiceCollection AddAuthLayer(this IServiceCollection services, ConfigurationManager configuration)
        {
            services
                .AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(options => options.TokenValidationParameters =
                    new TokenValidationParameters()
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidAudience = configuration["JWT:ValidAudience"],
                        ValidIssuer = configuration["JWT:ValidIssuer"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secert"])),
                        ValidateLifetime = true,
                        ClockSkew = TimeSpan.Zero
                    });
            return services;
        }

        public static IServiceCollection AddSwaggerConfig(this IServiceCollection services)
        {

            #region AddSwagger
            services.AddSwaggerGen(
                c =>
                {
                    c.SwaggerDoc("v1", new OpenApiInfo
                    { Title = "BookStore", Version = "v1.0.0" });

                    var securitySchema = new OpenApiSecurityScheme
                    {
                        Description = "JWT Authorization header using " +
                        "the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
                        Name = "Authorization",
                        In = ParameterLocation.Header,
                        Type = SecuritySchemeType.Http,
                        Scheme = "bearer",
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                        }
                    };

                    c.AddSecurityDefinition("Bearer", securitySchema);

                    var securityRequirement = new OpenApiSecurityRequirement
                            {
                    { securitySchema, new[] { "Bearer" } }
                            };

                    c.AddSecurityRequirement(securityRequirement);

                });


            #endregion
            return services;
        }
    }
}
