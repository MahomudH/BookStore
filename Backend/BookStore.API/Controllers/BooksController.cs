using BookStore.API.DTOs.Book;
using BookStore.API.Interfaces;
using BookStore.API.Models;
using BookStore.API.Services;
using MapsterMapper;
using Microsoft.AspNetCore.Mvc;


namespace BookStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly IBookRepository _bookRepository;
        private readonly IAuthorRepository _authorRepository;
        private readonly IMapper _mapper;
        private readonly IFileService _fileService;

        public BooksController(IBookRepository bookRepository, IMapper mapper, IFileService fileService)
        {
            _bookRepository = bookRepository;
            _mapper = mapper;
            _fileService = fileService;
        }


        // GET: api/<BooksController>
        [HttpGet]
        public async Task<ActionResult<List<BookDto>>> GetAllBooks()
        {
            var books = await _bookRepository.GetAllAsync();
            var result = new List<BookDto>();

            foreach (var book in books)
            {
                result.Add(_mapper.Map<BookDto>(book));
            }

            return Ok(result);
        }

        // GET api/<BooksController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BookDto>> GetBookById(int id)
        {
            var book = await _bookRepository.GetByIdAsync(id);

            var result = _mapper.Map<BookDto>(book);

            return result != null ? Ok(result) : NotFound("Book was not found");
        }

        // POST api/<BooksController>
        [HttpPost]
        public async Task<IActionResult> CreateBook([FromForm] CreateBookInput input)
        {
            var book = _mapper.Map<Book>(input);
            book.PublishYear = DateTime.Now;
            var imgName = await _fileService.SaveFile(input.Image, "Images");
            book.Image = imgName;

            var result = await _bookRepository.AddAsync(book);
            return result != null
                ? CreatedAtAction(nameof(GetAllBooks), new { id = result.Id }, result)
                : BadRequest();
        }

        // PUT api/<BooksController>/5
        [HttpPut]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<BooksController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var result = await _bookRepository.DeleteAsync(id);
            return Ok(result);
        }

        [HttpGet("getLastBook")]
        public async Task<List<BookDto>> GetLastSixBooks()
        {
            var books = await _bookRepository.GetLastSixBooks();

            return _mapper.Map<List<BookDto>>(books);
        }

    }
}
