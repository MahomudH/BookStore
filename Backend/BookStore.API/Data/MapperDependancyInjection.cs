﻿using Mapster;
using MapsterMapper;
using System.Reflection;

namespace BookStore.API.Data
{
    public static class MapperDependancyInjection
    {

        public static IServiceCollection AddMapping(this IServiceCollection services)
        {

            var config = TypeAdapterConfig.GlobalSettings;
            config.Scan(Assembly.GetExecutingAssembly());

            services.AddSingleton(config);
            services.AddScoped<IMapper, ServiceMapper>();

            return services;
        }
    }
}
