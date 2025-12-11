using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Notes
    {
        [Key]
        public int NoteID { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public int StudentID { get; set; }
    }
}