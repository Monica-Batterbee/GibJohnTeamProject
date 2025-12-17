namespace Backend.Models
{
    //Example data model - stores the data found in the table and the data type
    public class Assignment
    {
        public int AssignmentID { get; set; }
        public int TaskID { get; set; }
        public int StudentID { get; set; }
        public string? CurrentWork {get; set; }
        public bool? Submitted { get; set; }
        public string? Grade { get; set; }
        public string? Feedback { get; set; }
    }
}