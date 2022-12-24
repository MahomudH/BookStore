using BookStore.API.Data;
using BookStore.API.Interfaces;
using BookStore.API.Models;
using Microsoft.EntityFrameworkCore;

namespace BookStore.API.Repositories
{
    public class ZoneRepository : IZoneRepository
    {
        private readonly BookStoreDbContext _context;

        public ZoneRepository(BookStoreDbContext context)
        {
            _context = context;
        }
        public async Task<List<Zone>> GetAllAsync()
        {
            return await _context.Zones.ToListAsync();
        }

        public async Task<Zone?> GetByIdAsync(int id)
        {
            return await _context.Zones.FindAsync(id);
        }

        public async Task<Zone> AddAsync(Zone zone)
        {
            await _context.Zones.AddAsync(zone);
            await _context.SaveChangesAsync();
            return zone;
        }

        public async Task<Zone> UpdateAsync( Zone zone)
        {
            var foundZone = await _context.Zones.FindAsync(zone.Id);

            if (foundZone == null) throw new Exception("Zone not found!");

            foundZone.Name = zone.Name;

            _context.Zones.Update(foundZone);
            await _context.SaveChangesAsync();

            return foundZone;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var zone = await _context.Zones.FindAsync(id);

            if (zone == null) return false;

            _context.Zones.Remove(zone);

            return await _context.SaveChangesAsync() > 0;

        }
    }
}
