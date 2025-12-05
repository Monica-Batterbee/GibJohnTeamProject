using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;

[Route("api/[controller]")]
[ApiController]
public class TasksController : ControllerBase
{
    private readonly AppDbContext _context;

    public TasksController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetTasks()
    {
        var tasks = await _context.Task.ToListAsync();
        return Ok(tasks);
    }

    [HttpPost]
    public async System.Threading.Tasks.Task<IActionResult> AddTask([FromBody] TaskItem task)
    {
        _context.Task.Add(task);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetTasks), new { id = task.TaskID }, task);
    }
}