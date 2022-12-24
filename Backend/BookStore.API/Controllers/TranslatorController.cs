using BookStore.API.DTOs.Authors;
using BookStore.API.DTOs.Category;
using BookStore.API.DTOs.Translator;
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
    public class TranslatorController : ControllerBase
    {
        private readonly ITranslatorRepository _translatorRepository;
        private readonly IMapper _mapper;

        public TranslatorController(ITranslatorRepository translatorRepository, IMapper mapper)
        {
            _translatorRepository = translatorRepository;
            _mapper = mapper;
        }


        // GET: api/<TranslatorController>
        [HttpGet]
        public async Task<IActionResult> GetAllTranslators()
        {
            return Ok(await _translatorRepository.GetAllAsync());
        }


        // GET api/<TranslatorController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TranslatorDto>> GetTranslatorById(int id)
        {
            var author = await _translatorRepository.GetByIdAsync(id);

            var result = new GetAuthorForViewDto()
            {
                Name = author.Name
            };

            return author != null ? Ok(author) : NotFound("Translator was not found");
        }

        // POST api/<TranslatorController>
        [HttpPost]
        public async Task<IActionResult> CreateTranslator([FromBody] CreateTranslatorInput input)
        {
            var translator = _mapper.Map<Translator>(input);

            var result = await _translatorRepository.AddAsync(translator);
            return result != null
                ? CreatedAtAction(nameof(GetAllTranslators), new { id = result.Id }, result)
                : BadRequest();
        }

        // PUT api/<TranslatorController>/5
        [HttpPut]
        public async Task<IActionResult> UpdateAuthor([FromBody] UpdateTranslatorInput input)
        {
            var translator = await _translatorRepository.GetByIdAsync(input.Id);

            if (translator == null) return NotFound("Translator was not found");
            translator.Name = input.Name;

            var result = await _translatorRepository.UpdateAsync(translator);
            return result != null
                ? Ok(result)
                : BadRequest();
        }

        // DELETE api/<TranslatorController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var result = await _translatorRepository.DeleteAsync(id);
            return Ok(result);
        }
    }
}
