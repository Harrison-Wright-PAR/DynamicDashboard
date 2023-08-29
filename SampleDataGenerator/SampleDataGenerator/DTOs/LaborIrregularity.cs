using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SampleDataGenerator.DTOs
{
    public record LaborIrregularity
    {
        public int Id { get; set; }

        public string Name { get; set; } = null!;

        public string LastEvent { get; set; } = null!;

        public DateTime Date { get; set; }
    }
}
