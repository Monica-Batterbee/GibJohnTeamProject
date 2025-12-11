using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;

[Route("api/[controller]")]
[ApiController]
public class LearningController : ControllerBase
{
    private readonly AppDbContext _context;

    public LearningController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetLearning()
    {
        var learning = await _context.WiderLearning.ToListAsync();
        return Ok(learning);
    }

}