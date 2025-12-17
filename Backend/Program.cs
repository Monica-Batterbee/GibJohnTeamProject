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
        policy.WithOrigins("http://localhost:5173","http://localhost:5174") // React dev server URL
              .AllowAnyHeader()
              .AllowAnyMethod());
});


var app = builder.Build();


app.UseHttpsRedirection();

app.UseCors("ReactApp");

app.UseAuthorization();

app.MapControllers();

app.Run();

