
using Bogus;
using Bogus.Distributions.Gaussian;
using SampleDataGenerator;
using SampleDataGenerator.DTOs;
using System.Text.Json;

Randomizer.Seed = new Random(8675309);

if (Directory.Exists("data"))
{
    Directory.Delete("data", true);
}

Directory.CreateDirectory("data");

var itemNames = new List<string>() { "Hamburger", "Cheeseburger", "Fries", "Shake", "Salad", "Chicken Tenders", "Tator Tots", "Ice Cream", "Coffee - Iced", "Coffee - Hot" };

var items = new Faker<Item>()
    .StrictMode(true)
    .RuleFor(i => i.Id, f => f.IndexFaker)
    .RuleFor(i => i.Name, f => f.PickRandom(itemNames))
    .RuleFor(i => i.Cost, f => f.Finance.Amount(0, 20));
var itemData = items.Generate(itemNames.Count);
var itemJson = JsonSerializer.Serialize(itemData, new JsonSerializerOptions { WriteIndented = true });
File.WriteAllText("data/items.json", itemJson);
DataOutputter.WriteConsole("item", itemData.Count, itemJson);

var changeNames = new List<string>() { "New Item", "Price Change", "Item Removal", "Item Addition" };
var menuChanges = new Faker<MenuChange>()
    .StrictMode(true)
    .RuleFor(m => m.Id, f => f.IndexFaker)
    .RuleFor(m => m.Name, f => f.PickRandom(changeNames))
    .RuleFor(m => m.Date, f => f.Date.Recent(60));
var menuChangeData = menuChanges.Generate(25);
var menuChangeJson = JsonSerializer.Serialize(menuChangeData, new JsonSerializerOptions { WriteIndented = true });
File.WriteAllText("data/menuChanges.json", menuChangeJson);
DataOutputter.WriteConsole("menu change", menuChangeData.Count, menuChangeJson);

var orderItem = new Faker<OrderItem>()
    .RuleFor(o => o.ItemId, f => f.PickRandom(itemData).Id)
    .RuleFor(o => o.Quantity, f => f.Random.Number(1, 10));

var order = new Faker<Order>()
    .StrictMode(true)
    .RuleFor(o => o.Id, f => f.IndexFaker)
    .RuleFor(o => o.Date, f => f.Date.Recent(60))
    .RuleFor(o => o.Items, f => orderItem.GenerateBetween(1, 5))
    .RuleFor(o => o.Cost, (f, o) => Math.Round(o.Items.Sum(i => itemData.First(id => id.Id == i.ItemId).Cost * i.Quantity), 2))
    .RuleFor(o => o.Tax, (f, o) => Math.Round(o.Cost * 0.06m, 2))
    .RuleFor(o => o.Total, (f, o) => Math.Round(o.Cost + o.Tax, 2));

var orderData = order.Generate(100);
var orderJson = JsonSerializer.Serialize(orderData, new JsonSerializerOptions { WriteIndented = true });
File.WriteAllText("data/orders.json", orderJson);
DataOutputter.WriteConsole("order", orderData.Count, orderJson);

var laborDayOffset = 0;
var laborDate = DateTime.Now.Date;
var laborCost = new Faker<LaborCost>()
    .RuleFor(l => l.Offset, f => laborDayOffset)
    .RuleFor(l => l.ActualHours, f => f.Random.GaussianInt(80d, 20d))
    .RuleFor(l => l.TargetHours, f => f.Random.GaussianInt(80d, 10d))
    .RuleFor(l => l.Date, f => laborDate.AddDays(-(laborDayOffset++)));

var laborCostData = laborCost.Generate(14);
var laborCostJson = JsonSerializer.Serialize(laborCostData, new JsonSerializerOptions { WriteIndented = true });
File.WriteAllText("data/laborCost.json", laborCostJson);
DataOutputter.WriteConsole("labor cost", laborCostData.Count, laborCostJson);

var deviceHealthId = 0;
var deviceHealth = new Faker<DeviceHealth>()
    .RuleFor(d => d.Id, f => deviceHealthId++)
    .RuleFor(d => d.Name, (f, o) => $"Counter: {o.Id}")
    .RuleFor(d => d.status, f => f.Random.Enum<DeviceStatus>());

var deviceHealthData = deviceHealth.Generate(10);
var deviceHealthJson = JsonSerializer.Serialize(deviceHealthData, new JsonSerializerOptions { WriteIndented = true });
File.WriteAllText("data/deviceHealth.json", deviceHealthJson);
DataOutputter.WriteConsole("device health", deviceHealthData.Count, deviceHealthJson);

var customerFeedbackId = 0;
var customerFeedback = new Faker<CustomerFeedback>()
    .RuleFor(c => c.Id, f => customerFeedbackId++)
    .RuleFor(c => c.CustomerName, f => f.Name.FullName())
    .RuleFor(c => c.Date, f => f.Date.Recent(60))
    .RuleFor(c => c.Rating, f => f.Random.Number(1, 5))
    .RuleFor(c => c.Feedback, f => f.Rant.Review("Cheeseburger"));

var customerFeedbackData = customerFeedback.Generate(100);
var customerFeedbackJson = JsonSerializer.Serialize(customerFeedbackData, new JsonSerializerOptions { WriteIndented = true });
File.WriteAllText("data/customerFeedback.json", customerFeedbackJson);
DataOutputter.WriteConsole("customer feedback", customerFeedbackData.Count, customerFeedbackJson);

var laborIrregularities = new Faker<LaborIrregularity>()
    .RuleFor(l => l.Date, f => f.Date.Recent(60))
    .RuleFor(l => l.LastEvent, f => f.Lorem.Sentence(5))
    .RuleFor(l => l.Name, f => f.Name.FullName());

var laborIrregularityData = laborIrregularities.Generate(20);
var laborIrregularityJson = JsonSerializer.Serialize(laborIrregularityData, new JsonSerializerOptions { WriteIndented = true });
File.WriteAllText("data/laborIrregularity.json", laborIrregularityJson);
DataOutputter.WriteConsole("labor irregularity", laborIrregularityData.Count, laborIrregularityJson);

// ACtually used on Daily Sales Report
//var salesTrendsDayOffset = 0;
//var salesTrendsDate = DateTime.Now.Date;
//var salesTrends = new Faker<SalesTrend>()
//        .RuleFor(l => l.Offset, f => salesTrendsDayOffset)
//        .RuleFor(l => l.Date, f => salesTrendsDate.AddDays(-(salesTrendsDayOffset++)))
//        .RuleFor(l => l.SalesTotal, s => s.Finance.Amount(1000, 5000))
//        .RuleFor(l => l.LaborHours, f => Math.Round(f.Random.GaussianDecimal(80d, 20d), 2));
//var salesTrendData = salesTrends.Generate(90);
//var salesTrendJson = JsonSerializer.Serialize(salesTrendData, new JsonSerializerOptions { WriteIndented = true });
//File.WriteAllText("data/salesTrend.json", salesTrendJson);
//DataOutputter.WriteConsole("sales trend", salesTrendData.Count, salesTrendJson);

var salesTrendsDayOffset = 0;
var salesTrendsDate = DateTime.Now.Date.AddDays(1);
var salesTrends = new Faker<SalesTrend>()
        .RuleFor(l => l.Offset, f => salesTrendsDayOffset)
        .RuleFor(l => l.Date, f => salesTrendsDate.AddHours(-(salesTrendsDayOffset++)))
        .RuleFor(l => l.AverageTicketPrice, s => Math.Round(s.Random.GaussianDecimal(25d, 10d), 2))
        .RuleFor(l => l.LaborHours, f => Math.Round(f.Random.GaussianDecimal(25d, 5d), 2));
var salesTrendData = salesTrends.Generate(24);
var salesTrendJson = JsonSerializer.Serialize(salesTrendData, new JsonSerializerOptions { WriteIndented = true });
File.WriteAllText("data/salesTrend.json", salesTrendJson);
DataOutputter.WriteConsole("sales trend", salesTrendData.Count, salesTrendJson);
