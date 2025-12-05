using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;

[Route("api/[controller]")]
[ApiController]
public class RelationshipsController : ControllerBase
{
    private readonly AppDbContext _context;

    public RelationshipsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetRelationships()
    {
        var relationships = await _context.Relationship.ToListAsync();
        return Ok(relationships);
    }

    [HttpPost]
    public async Task<IActionResult> AddRelationship([FromBody] Relationship relationship)
    {
        _context.Relationship.Add(relationship);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetRelationships), new { id = relationship.RelationshipID }, relationship);
    }
}