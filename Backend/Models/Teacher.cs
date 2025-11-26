namespace Backend.Models
{
    public class Teacher
    {
        public int TeacherID { get; set; }
        public string TeacherFname { get; set; } = string.Empty;
        public string? TeacherSname { get; set; }

        public string? TeacherEmail { get; set; }

    }
}