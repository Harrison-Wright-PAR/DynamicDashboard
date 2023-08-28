using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SampleDataGenerator.DTOs
{
    public record Order
    {
        public int Id { get; set; }

        public DateTime Date { get; set; }

        public decimal Cost { get; set; }

        public decimal Tax { get; set; }

        public decimal Total { get; set; }

        public List<OrderItem> Items { get; set; } = new List<OrderItem>();
    }
}
