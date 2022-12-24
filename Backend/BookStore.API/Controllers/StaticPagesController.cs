using BookStore.API.DTOs.Authors;
using BookStore.API.DTOs.StaticPages;
using BookStore.API.Interfaces;
using BookStore.API.Models;
using BookStore.API.Repositories;
using MapsterMapper;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BookStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StaticPagesController : ControllerBase
    {
        private readonly IStaticPageRepository _staticPagesRepository;
        private readonly IMapper _mapper;
        public StaticPagesController(IStaticPageRepository staticPagesRepository, IMapper mapper)
        {
            _staticPagesRepository = staticPagesRepository;
            _mapper = mapper;
        }

        // GET: api/<StaticPagesController>
        [HttpGet]
        public async Task<IActionResult> GetAllStaticPages()
        {
            return Ok(await _staticPagesRepository.GetAllAsync());
        }

        // GET api/<StaticPagesController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StaticPageDto>> Get(int id)
        {
            var staticPage = await _staticPagesRepository.GetByIdAsync(id);

            return _mapper.Map<StaticPageDto>(staticPage);
        }

        //// POST api/<StaticPagesController>
        //[HttpPost]
        //public async Task<IActionResult> CreateStaticPage([FromBody] CreateStaticPage input)
        //{
        //    var staticPage = _mapper.Map<StaticPage>(input);

        //    var result = await _staticPagesRepository.AddAsync(staticPage);
        //    return result != null
        //        ? CreatedAtAction(nameof(GetAllStaticPages), new { id = result.Id }, result)
        //        : BadRequest();
        //}

        // PUT api/<StaticPagesController>/5
        [HttpPut]
        public async Task<IActionResult> UpdateStaticPage([FromBody] UpdateStaticPagesInput input)
        {
            var staticPage = await _staticPagesRepository.GetByIdAsync(input.Id);
            
            if (staticPage == null) return NotFound("Static page was not found");

            _mapper.Map(input, staticPage);
            _staticPagesRepository.Update(staticPage);
           ;
           return Ok("Static page was updated");

        }

        //// DELETE api/<StaticPagesController>/5
        //[HttpDelete("{id}")]
        //public async Task<ActionResult> Delete(int id)
        //{
        //    var result = await _staticPagesRepository.DeleteAsync(id);
        //    return result ? Ok("Deleted static page") : NotFound("Static page was not found");
        //}
    }
}
