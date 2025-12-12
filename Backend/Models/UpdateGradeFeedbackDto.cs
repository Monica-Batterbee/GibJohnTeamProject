using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class UpdateGradeFeedback
    {
        public string? Grade  { get; set; }
        public string? Feedback { get; set; }
    }
}