using BookStore.API.DTOs.Category;
using BookStore.API.DTOs.Publishers;
using BookStore.API.Interfaces;
using BookStore.API.Models;
using BookStore.API.Repositories;
using BookStore.API.Services;
using MapsterMapper;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BookStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PublishersController : ControllerBase
    {
        private readonly IPublisherRepository _publisherRepository;
        private readonly IMapper _mapper;
        private readonly IFileService _fileService;

        public PublishersController(IPublisherRepository publisherRepository, IMapper mapper, IFileService fileService)
        {
            _publisherRepository = publisherRepository;
            _mapper = mapper;
            _fileService = fileService;
        }

        // GET: api/<PublishersController>
        [HttpGet]
        public async Task<IActionResult> GetAllPublishers()
        {
            return Ok(await _publisherRepository.GetAllAsync());
        }

        // GET api/<PublishersController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PublisherDto>> GetPublisherById(int id)
        {
            var publisher = await _publisherRepository.GetByIdAsync(id);

            var result = _mapper.Map<PublisherDto>(publisher);
            return result != null ? Ok(result) : NotFound("Publisher was not found");
        }

        //todo fix the image issue
        // POST api/<PublishersController>
        [HttpPost]
        public async Task<IActionResult> CreatePublisher([FromForm] CreatePublisherInput input)
        {
            var publisher = _mapper.Map<Publisher>(input);

            var imgNme = await _fileService.SaveFile(input.Logo, "Images");
            publisher.Logo = imgNme;

            var result = await _publisherRepository.AddAsync(publisher);
            return result != null
                ? CreatedAtAction(nameof(GetAllPublishers), new { id = result.Id }, result)
                : BadRequest();
        }

        // PUT api/<PublishersController>/5
        [HttpPut]
        public async Task<IActionResult> UpdatePublisher([FromForm] UpdatePublisherInput input)
        {
            var publisher = await _publisherRepository.GetByIdAsync(input.Id);

            _mapper.Map(input,publisher);
            var imgNme = await _fileService.SaveFile(input.Logo, "Images");
            publisher.Logo = imgNme;

            var result = await _publisherRepository.UpdateAsync(publisher);
            return result != null
                ? CreatedAtAction(nameof(GetAllPublishers), new { id = result.Id }, result)
                : BadRequest();
        }

        // DELETE api/<PublishersController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var result = await _publisherRepository.DeleteAsync(id);
            return Ok(result);
        }
    }
}
