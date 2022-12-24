using BookStore.API.DTOs.Category;
using BookStore.API.Interfaces;
using BookStore.API.Models;
using MapsterMapper;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BookStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {

        private readonly ICategoryRepository _categoryRepository;
        private readonly IMapper _mapper;

        public CategoriesController(ICategoryRepository categoryRepository, IMapper mapper)
        {
            _categoryRepository = categoryRepository;
            _mapper = mapper;
        }

        // GET: api/<CategoriesController>
        [HttpGet]
        public async Task<IActionResult> GetAllCategoies()
        {
            return Ok(await _categoryRepository.GetAllAsync());
        }

        // GET api/<CategoriesController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryDto>> GetCategoryById(int id)
        {
            var category = await _categoryRepository.GetByIdAsync(id);

            var result = new CategoryDto()
            {
                Name = category.Name
            };

            return category != null ? Ok(category) : NotFound("Author was not found");
        }

        // POST api/<CategoriesController>
        [HttpPost]
        public async Task<IActionResult> CreateCategory([FromBody] CreateCategoryInput input)
        {
            var category = _mapper.Map<Category>(input);

            var result = await _categoryRepository.AddAsync(category);
            return result != null
                ? CreatedAtAction(nameof(GetAllCategoies), new { id = result.Id }, result)
                : BadRequest();
        }

        // PUT api/<CategoriesController>/5
        [HttpPut]
        public async Task<IActionResult> UpdateCategory([FromBody] UpdateCategoryInput input)
        {
            var category = await _categoryRepository.GetByIdAsync(input.Id);

            if (category == null) return NotFound("Category was not found");
            category.Name = input.Name;
            var result = await _categoryRepository.UpdateAsync(category);
            return result != null
                ? Ok(result)
                : BadRequest();
        }

        // DELETE api/<CategoriesController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var result = await _categoryRepository.DeleteAsync(id);
            return Ok(result);
        }
    }
}
