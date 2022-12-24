using BookStore.API.DTOs.Authentication;
using BookStore.API.Models;

namespace BookStore.API.Services.JwtService
{
    public interface IJwtTokenGenerator
    {
        Task<AuthenticationResponse> Generate(AppUser user);
    }
}
