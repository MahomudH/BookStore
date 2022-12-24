using BookStore.API.DTOs.Authors;
using BookStore.API.Interfaces;
using BookStore.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace BookStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorController : ControllerBase
    {
        private readonly IAuthorRepository _authorRepository;

        public AuthorController(IAuthorRepository authorRepository)
        {
            _authorRepository = authorRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAuthors()
        {
            return Ok(await _authorRepository.GetAllAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GetAuthorForViewDto>> GetAuthorById(int id)
        {
            var author = await _authorRepository.GetByIdAsync(id);

            var result = new GetAuthorForViewDto()
            {
                Name = author.Name
            };
            return author != null ? Ok(author) : NotFound("Author was not found");
        }

        [HttpPost]
        public async Task<IActionResult> CreateAuthor([FromBody] AddAuthorInput input)
        {
            var author = new Author()
            {
                Name = input.Name,
            };

            var result = await _authorRepository.AddAsync(author);
            return result != null
                ? CreatedAtAction(nameof(GetAllAuthors), new { id = result.Id }, result)
                : BadRequest();
        }

        [HttpPut]
        public async Task<IActionResult> UpdateAuthor([FromBody] UpdateAuthorInput input)
        {
            var author = await _authorRepository.GetByIdAsync(input.Id);
            author.Name = input.Name;
            if (author == null) return NotFound("Author was not found");

            var result = await _authorRepository.UpdateAsync(author);
            return result != null
                ? Ok(result)
                : BadRequest();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAuthor(int id)
        {
            var result = await _authorRepository.DeleteAsync(id);
            return Ok(result);
        }
    }
}
