using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;

[Route("api/[controller]")]
[ApiController]
public class ResultsController : ControllerBase
{
    private readonly AppDbContext _context;

    public ResultsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetResults()
    {
        var results = await _context.TestResult.ToListAsync();
        return Ok(results);
    }

    [HttpPost]
    public async Task<IActionResult> AddAssignment([FromBody] TestResult result)
    {
        _context.TestResult.Add(result);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetResults), new { id = result.ResultID }, result);
    }
}