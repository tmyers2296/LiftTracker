using System.Security.Claims;

public static class DashboardEndpoints
{
    public static void MapExerciseEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("dashboard");

        // create
        group.MapPost("/", async (IDashboardService dashboardService, CreateDashboardRequest request, ClaimsPrincipal user) =>
        {
            var userId = user.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            Dashboard dashboard = request.MapToDashboard();

            if (userId == null) return Results.Unauthorized();
            dashboard.CreatedByUserId = userId;

            Dashboard? createdDashboard = await dashboardService.Create(dashboard);
            return Results.Created($"/dashboard/", createdDashboard.MapToResponse());
        }).RequireAuthorization();

        // read
        group.MapGet("/{id:int}", async (IDashboardService dashboardService, int id, ClaimsPrincipal user) =>
        {
            string? userId = user.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (userId == null) return Results.Unauthorized();

            Dashboard? dashboard = await dashboardService.GetById(id, userId);
            return (dashboard != null)? Results.Ok(dashboard.MapToResponse()) : Results.NotFound();
        }).RequireAuthorization();

        // update
        group.MapPut("/{id:int}", async (IDashboardService dashboardService, int id, UpdateDashboardRequest request, ClaimsPrincipal user) => 
        {
            Dashboard? dashboard = request.MapToDashboard(id);

            var userId = user.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (userId == null || dashboard.CreatedBy != userId) return Results.Unauthorized();
            DashboardResponse dashboardResponse = dashboard.MapToResponse();
            Dashboard? resultDashboard = await dashboardService.DeepUpdate(dashboard);
            DashboardResponse newDashboardResponse = dashboard.MapToResponse();
            return (resultDashboard != null)? Results.Ok(newDashboardResponse) : Results.NotFound();
        });


        // delete
    }
}