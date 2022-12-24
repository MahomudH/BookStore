using BookStore.API.DTOs.Authors;
using BookStore.API.DTOs.Zone;
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
    public class ZonesController : ControllerBase
    {
        private readonly IZoneRepository _zoneRepository;
        private readonly IMapper _mapper;

        public ZonesController(IZoneRepository zoneRepository, IMapper mapper)
        {
            _zoneRepository = zoneRepository;
            _mapper = mapper;
        }

        // GET: api/<ZonesController>
        [HttpGet]
        public async Task<IActionResult> GetAllZones()
        {
            return Ok(await _zoneRepository.GetAllAsync());
        }

        // GET api/<ZonesController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ZoneDto>> GetZoneById(int id)
        {
            var zone = await _zoneRepository.GetByIdAsync(id);

            var result = _mapper.Map<ZoneDto>(zone);

            return result != null ? Ok(result) : NotFound("Zone was not found");
        }


        // POST api/<ZonesController>
        [HttpPost]
        public async Task<IActionResult> CreateZone([FromBody] CreateZoneInput input)
        {
            var zone = _mapper.Map<Zone>(input);

            var result = await _zoneRepository.AddAsync(zone);
            return result != null
                ? CreatedAtAction(nameof(GetAllZones), new { id = result.Id }, result)
                : BadRequest();
        }

        // PUT api/<ZonesController>/5
        [HttpPut]
        public async Task<IActionResult> CreateZone([FromBody] UpdateZoneInput input)
        {
            var zone = _mapper.Map<Zone>(input);

            if (zone == null) return NotFound("Zone was not found");

            var result = await _zoneRepository.UpdateAsync(zone);
            return result != null
                ? Ok(result)
                : BadRequest();
        }

        // DELETE api/<ZonesController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAuthor(int id)
        {
            var result = await _zoneRepository.DeleteAsync(id);
            return Ok(result);
        }
    }
}
