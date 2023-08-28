using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace SampleDataGenerator
{
    public static class DataOutputter
    {
        public static void WriteConsole(string type, int count, string jsonData)
        {
            Console.WriteLine($"Generated {count} {type} records.");
            Console.WriteLine(jsonData);
            Console.WriteLine();
        }
    }
}
