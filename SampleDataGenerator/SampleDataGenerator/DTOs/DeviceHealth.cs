using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SampleDataGenerator.DTOs
{
    public record DeviceHealth
    {
        public int Id { get; set; }

        public string Name { get; set; } = null!;

        public DeviceStatus status { get; set; }
    }
}
