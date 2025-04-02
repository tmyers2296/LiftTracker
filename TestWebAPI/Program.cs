using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("ApplicationDbContextConnection");

// Register ApplicationDbContext with PostgreSQL
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddAuthorization();
builder.Services.AddIdentityApiEndpoints<ApplicationUser>()
            .AddEntityFrameworkStores<ApplicationDbContext>();

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("https://localhost:5173") // React app URL
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Other services
builder.Services.AddOpenApi();
builder.Services.AddSwaggerGen();

// custom services..
builder.Services.AddScoped<IExerciseService, ExerciseService>();
builder.Services.AddScoped<IRoutineService, RoutineService>();
builder.Services.AddScoped<IWorkoutService, WorkoutService>();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();
app.MapIdentityApi<ApplicationUser>();

app.MapPost("/logout", async (SignInManager<ApplicationUser> signInManager) =>
{
    await signInManager.SignOutAsync();
    return Results.Ok();
}).RequireAuthorization();

app.MapGet("/pingauth", (ClaimsPrincipal user) =>
{
    var email = user.FindFirstValue(ClaimTypes.Email);
    return Results.Json(new { Email = email });
}).RequireAuthorization();

// Middleware setup
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(); // Adds the Swagger UI
}

// Use CORS
app.UseCors();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// autorisation / redirection:
app.UseHttpsRedirection();
app.UseAuthorization();

// endpoints for application objects:
app.MapExerciseEndpoints();
app.MapRoutineEndpoints();
app.MapWorkoutEndpoints();

app.Run();
