using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SampleDataGenerator.DTOs
{
    public record LaborCost
    {
        public int Offset { get; set; }

        public DateTime Date { get; set; }

        public int ActualHours { get; set; }

        public int TargetHours { get; set; }
    }
}
