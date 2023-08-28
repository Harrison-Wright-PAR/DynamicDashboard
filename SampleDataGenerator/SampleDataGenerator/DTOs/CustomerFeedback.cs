using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SampleDataGenerator.DTOs
{
    public record CustomerFeedback
    {
        public int Id { get; set; }

        public int Rating { get; set; }

        public string CustomerName { get; set; } = null!;

        public string Feedback { get; set; } = null!;

        public DateTime Date { get; set; }
    }
}
