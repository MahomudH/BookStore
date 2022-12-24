using BookStore.API.DTOs.Address;
using BookStore.API.DTOs.Category;
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
    public class AddressController : ControllerBase
    {
        private readonly IAddressRepository _addressRepository;
        private readonly IMapper _mapper;

        public AddressController(IAddressRepository addressRepository, IMapper mapper)
        {
            _addressRepository = addressRepository;
            _mapper = mapper;
        }

        // GET: api/<AddressController>
        [HttpGet]
        public async Task<IActionResult> GetAllAddresses()
        {
            return Ok(await _addressRepository.GetAllAsync());
        }

        // GET api/<AddressController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Address>> GetAddressById(int id)
        {
            var address = await _addressRepository.GetByIdAsync(id);

            return address != null ? Ok(address) : NotFound("Address was not found");
        }

        // POST api/<AddressController>
        [HttpPost]
        public async Task<IActionResult> CreateAddress([FromBody] CreateAddressInput input)
        {
            var address = _mapper.Map<Address>(input);
            var result = await _addressRepository.AddAsync(address);
            return result != null ? CreatedAtAction(nameof(GetAllAddresses), new { id = result.Id }, result) : BadRequest();
        }

        // PUT api/<AddressController>/5
        [HttpPut]
        public async Task<IActionResult> UpdateAddress([FromBody] UpdateAddressInput input)
        {
            var address = _mapper.Map<Address>(input);
            var result = await _addressRepository.UpdateAsync(address);
            return result != null
                ? Ok(result)
                : BadRequest();
        }

        // DELETE api/<AddressController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAddress(int id)
        {
            var result = await _addressRepository.DeleteAsync(id);
            return result ? Ok("Address was deleted") : NotFound("Address was not found");
        }
    }
}
