using Microsoft.EntityFrameworkCore;
using Backend.Models;

//DB context
namespace Backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }
        //The different tables that are stored within the database
        public DbSet<Course> Course { get; set; }
        public DbSet<Teacher> Teacher { get; set; }    
        public DbSet<Student> Student { get; set; }
         public DbSet<TestResult> TestResult { get; set; }
        public DbSet<TaskItem> Task { get; set; }
        public DbSet<Assignment> Assignment { get; set; }
        public DbSet<Relationship> Relationship { get; set; }
        public DbSet<WiderLearning> WiderLearning { get; set; }
        public DbSet<Notes> Notes { get; set; }
    }
}