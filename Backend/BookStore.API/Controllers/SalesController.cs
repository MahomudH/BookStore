using BookStore.API.DTOs.Authors;
using BookStore.API.DTOs.Category;
using BookStore.API.DTOs.Sale;
using BookStore.API.Interfaces;
using BookStore.API.Models;
using BookStore.API.Repositories;
using MapsterMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BookStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class SalesController : ControllerBase
    {
        private readonly ISaleRepository _saleRepository;
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;

        public SalesController(ISaleRepository saleRepository, IMapper mapper, UserManager<AppUser> userManager)
        {
            _saleRepository = saleRepository;
            _mapper = mapper;
            _userManager = userManager;
        }

        // GET: api/<SalesController>
        [HttpGet]
        public async Task<IActionResult> GetAllSales()
        {
            var sales = await _saleRepository.GetAllAsync();
            var result = _mapper.Map<List<ShowSalesForAdminDto>>(sales);
            return Ok(result);
        }

        // GET api/<SalesController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SaleDto>> GetAuthorById(int id)
        {
            var sale = await _saleRepository.GetByIdAsync(id);

            var result = _mapper.Map<SaleDto>(sale);

            return result != null ? Ok(result) : NotFound("Author was not found");
        }

        // POST api/<SalesController>
        [HttpPost]
        public async Task<IActionResult> AddSale([FromBody] CreateSaleInput input)
        {
            var sale = _mapper.Map<Sale>(input);

            var userEmail = HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Name)!.Value;

            var user = await _userManager.FindByEmailAsync(userEmail);

            sale.UserId = user.Id;
            sale.SaleStatus = SaleStatusEnum.Requested;
            sale.OrderDate = DateTime.Now;

            var result = await _saleRepository.AddAsync(sale);
            return result != null
                ? CreatedAtAction(nameof(GetAllSales), new { id = result.Id }, result)
                : BadRequest();
        }


        // PUT api/<SalesController>/5
        [HttpPut]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<SalesController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var result = await _saleRepository.DeleteAsync(id);
            return Ok(result);
        }

        [HttpGet("getUsersales")]
        public async Task<IActionResult> GetAllSalesForUser()
        {
            var userEmail = HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Name)!.Value;

            var user = await _userManager.FindByEmailAsync(userEmail);
            var sales = await _saleRepository.GetAllSalesForUser(user.Id);
            var result = _mapper.Map<ShowSalesForUserDto[]>(sales);
            return Ok(result);
        }

        [HttpGet("getUserOrders")]
        public async Task<IActionResult> GetAllOrdersForUser()
        {
            var userEmail = HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Name)!.Value;

            var user = await _userManager.FindByEmailAsync(userEmail);
            var sales = await _saleRepository.GetAllOrdersForUser(user.Id);
            var result = _mapper.Map<ShowSalesForUserDto[]>(sales);
            return Ok(result);
        }

        [HttpGet("getUserOrdersNumber")]
        public async Task<IActionResult> GetNumberOfAllOrdersForUser()
        {
            var userEmail = HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Name)!.Value;

            var user = await _userManager.FindByEmailAsync(userEmail);
            var result = await _saleRepository.GetNumberOfAllOrdersForUser(user.Id);
       
            return Ok(result);
        }


        [HttpPut("agreeSold")]
        public async Task AgreeSold([FromBody] int saleId)
        {
            await _saleRepository.AgreeSold(saleId);
        }


        [HttpPut("rejectSold")]
        public async Task RejectSold([FromBody] int saleId)
        {
            await _saleRepository.RejectSold(saleId);
        }

    }
}
