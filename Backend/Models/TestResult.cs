using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class TestResult
    {
        [Key]
        public int ResultID { get; set; }

        public int StudentID { get; set; }
        public int CourseID { get; set; }
        public int Score { get; set; }
    }
}