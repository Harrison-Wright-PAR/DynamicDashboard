using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SampleDataGenerator.DTOs
{
    public record SalesTrend
    {
        public int Offset { get; set; }

        public DateTime Date { get; set; }

        public decimal SalesTotal { get; set; }

        public decimal LaborHours { get; set; }
    }
}
