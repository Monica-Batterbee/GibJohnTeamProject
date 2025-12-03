using Microsoft.EntityFrameworkCore;
using Backend.Data; // Make sure your DbContext is in this namespace

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add controllers
builder.Services.AddControllers();

// Add CORS policy for React frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactApp", policy =>
        policy.WithOrigins("http://localhost:5174") // React dev server URL
              .AllowAnyHeader()
              .AllowAnyMethod());
});


var app = builder.Build();


app.UseHttpsRedirection();

app.UseCors("ReactApp");

app.UseAuthorization();

app.MapControllers();

app.Run();



// using Microsoft.EntityFrameworkCore;
// using Backend.Data;

// var builder = WebApplication.CreateBuilder(args);

// // 1️⃣ Register services BEFORE building the app
// builder.Services.AddDbContext<AppDbContext>(options =>
//     options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// builder.Services.AddControllers();

// builder.Services.AddCors(options =>
// {
//     options.AddPolicy("ReactApp",
//         policy => policy
//             .WithOrigins("http://localhost:5173")
//             .AllowAnyHeader()
//             .AllowAnyMethod());
// });

// var app = builder.Build();

// // 2️⃣ Configure middleware AFTER building the app
// app.UseHttpsRedirection();

// app.UseCors("ReactApp");

// app.UseAuthorization();

// app.MapControllers();

// app.Run();

// using Backend.Data;
// using Microsoft.EntityFrameworkCore;

// var builder = WebApplication.CreateBuilder(args);

// // Add services to the container.
// // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
// builder.Services.AddOpenApi();

// builder.Services.AddDbContext<AppDbContext>(options =>
//     options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// var app = builder.Build();

// // Configure the HTTP request pipeline.
// if (app.Environment.IsDevelopment())
// {
//     app.MapOpenApi();
// }

// app.UseHttpsRedirection();

// var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

// builder.Services.AddCors(options =>
// {
//     options.AddPolicy(name: MyAllowSpecificOrigins,
//         policy =>
//         {
//             policy.WithOrigins("http://localhost:5173/") 
//                   .AllowAnyHeader()
//                   .AllowAnyMethod();
//         });
// });


// app.UseCors(MyAllowSpecificOrigins);


// app.MapControllers();
// // var summaries = new[]
// // {
// //     "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
// // };

// // app.MapGet("/weatherforecast", () =>
// // {
// //     var forecast =  Enumerable.Range(1, 5).Select(index =>
// //         new WeatherForecast
// //         (
// //             DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
// //             Random.Shared.Next(-20, 55),
// //             summaries[Random.Shared.Next(summaries.Length)]
// //         ))
// //         .ToArray();
// //     return forecast;
// // })
// // .WithName("GetWeatherForecast");

// app.Run();

// record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
// {
//     public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
// }
