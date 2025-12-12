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

    [HttpPut("{id}/currentWork")]
        public async Task<IActionResult> UpdateCurrentWork(int id, [FromBody] UpdateCurrentWorkDto dto)
        {
            if (dto == null)
                return BadRequest("No data provided.");

            var assignment = await _context.Assignment.FindAsync(id);

            if (assignment == null)
                return NotFound($"Assignment with ID {id} not found.");

            assignment.CurrentWork = dto.CurrentWork;
            
            await _context.SaveChangesAsync();

            return Ok(new { message = "Current work updated successfully." });
        }

    [HttpPut("{id}/submitted")]
        public async Task<IActionResult> UpdateSubmit(int id, [FromBody] UpdateSubmitDto dto)
        {
            if (dto == null)
                return BadRequest("No data provided.");

            var assignment = await _context.Assignment.FindAsync(id);

            if (assignment == null)
                return NotFound($"Assignment with ID {id} not found.");

            assignment.Submitted = dto.Submitted;
            
            await _context.SaveChangesAsync();

            return Ok(new { message = "Current work updated successfully." });
        }

    [HttpPut("{id}/feedback")]
        public async Task<IActionResult> UpdateFeedback(int id, [FromBody] UpdateGradeFeedback dto)
        {
            if (dto == null)
                return BadRequest("No data provided.");

            var assignment = await _context.Assignment.FindAsync(id);

            if (assignment == null)
                return NotFound($"Assignment with ID {id} not found.");

            assignment.Grade = dto.Grade;
            assignment.Feedback = dto.Feedback;
            
            await _context.SaveChangesAsync();

            return Ok(new { message = "feedback updated successfully." });
        }
}