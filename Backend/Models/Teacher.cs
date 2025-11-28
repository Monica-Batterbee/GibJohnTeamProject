namespace Backend.Models
{
    public class Teacher
    {
        public int TeacherID { get; set; }
        public string Fname { get; set; } = string.Empty;
        public string? Sname { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }

    }
}