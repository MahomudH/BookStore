using BookStore.API.DTOs.BookReview;
using BookStore.API.DTOs.Category;
using BookStore.API.Interfaces;
using BookStore.API.Models;
using BookStore.API.Repositories;
using MapsterMapper;
using Microsoft.AspNetCore.Mvc;

namespace BookStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookReviewsController : ControllerBase
    {
        private readonly IBookReviewRepository _bookReviewRepository;
        private readonly IMapper _mapper;

        public BookReviewsController( IMapper mapper, IBookReviewRepository bookReviewRepository)
        {
            _mapper = mapper;
            _bookReviewRepository = bookReviewRepository;
        }

        // GET: api/<BookReviewsController>
        [HttpGet]
        public async Task<IActionResult> GetAllBookReviews()
        {
            return Ok(await _bookReviewRepository.GetAllAsync());
        }

        // GET api/<BookReviewsController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<BookReviewsController>
        [HttpPost]
        public async Task<IActionResult> CreateBookReview([FromBody] CreateBookReviewInput input)
        {
            var bookReview = _mapper.Map<BookReview>(input);

            var result = await _bookReviewRepository.AddAsync(bookReview);
            return result != null
                ? CreatedAtAction(nameof(GetAllBookReviews), new { id = result.Id }, result)
                : BadRequest();
        }

        // PUT api/<BookReviewsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<BookReviewsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
