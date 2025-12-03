using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class TaskItem
    {
        [Key]
        public int TaskID { get; set; }
        public int TeacherID { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set;}
    }
}