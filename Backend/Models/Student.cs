namespace Backend.Models
{
    public class Student
    {
        public int StudentID { get; set; }
        public string StudentFname { get; set; } = string.Empty;
        public string? StudentSname { get; set; }

        public string? StudentEmail { get; set; }

    }
}