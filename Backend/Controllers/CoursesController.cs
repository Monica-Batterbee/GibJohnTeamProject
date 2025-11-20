using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;

[Route("api/[controller]")]
[ApiController]
public class CoursesController : ControllerBase
{
    private readonly AppDbContext _context;

    public CoursesController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetCourses()
    {
        var courses = await _context.Course.ToListAsync();
        return Ok(courses);
    }

    // [HttpPost]
    // public async Task<IActionResult> AddCourse([FromBody] Course course)
    // {
    //     _context.Courses.Add(course);
    //     await _context.SaveChangesAsync();
    //     return CreatedAtAction(nameof(GetCourses), new { id = course.CourseID }, course);
    // }
}