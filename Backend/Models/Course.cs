namespace Backend.Models
{
    public class Course
    {
        public int CourseID { get; set; }
        public string CourseName { get; set; } = string.Empty;
        public string? CourseURL { get; set; }
    }
}