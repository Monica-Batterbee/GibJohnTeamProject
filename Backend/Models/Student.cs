namespace Backend.Models
{
    public class Student
    {
        public int StudentID { get; set; }
        public string Fname { get; set; } = string.Empty;
        public string? Sname { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }

    }
}