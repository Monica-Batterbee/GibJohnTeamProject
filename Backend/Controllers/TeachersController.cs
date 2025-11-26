using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;

[Route("api/[controller]")]
[ApiController]
public class TeachersController : ControllerBase
{
    private readonly AppDbContext _context;

    public TeachersController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetTeachers()
    {
        var teachers = await _context.Teacher.ToListAsync();
        return Ok(teachers);
    }

    [HttpPost]
    public async Task<IActionResult> AddTeacher([FromBody] Teacher teacher)
    {
        _context.Teacher.Add(teacher);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetTeachers), new { id = teacher.TeacherID }, teacher);
    }
}