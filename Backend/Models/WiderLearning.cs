using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class WiderLearning
    {
        [Key]
        public int ContentID { get; set; }
        public string? Name { get; set; }
        public string? URL { get; set; }
        public string? PageName { get; set; }

    }
}