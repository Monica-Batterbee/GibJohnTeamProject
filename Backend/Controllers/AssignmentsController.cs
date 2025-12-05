using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;

[Route("api/[controller]")]
[ApiController]
public class AssignmentsController : ControllerBase
{
    private readonly AppDbContext _context;

    public AssignmentsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAssignments()
    {
        var assignments = await _context.Assignment.ToListAsync();
        return Ok(assignments);
    }

    [HttpPost]
    public async Task<IActionResult> AddAssignment([FromBody] Assignment assignment)
    {
        _context.Assignment.Add(assignment);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetAssignments), new { id = assignment.AssignmentID }, assignment);
    }
}