using System.Security.Claims;

public static class WorkoutEndpoints
{
    public static void MapWorkoutEndpoints(this WebApplication app) 
    {
        // * general routine group *
        var group = app.MapGroup("workouts");

        // create:
        group.MapPost("/", async (IWorkoutService workoutService, CreateFullWorkoutRequest request, ClaimsPrincipal user) => 
        {
            var userId = user.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            Workout workout = request.MapToWorkout();

            if (userId == null) return Results.Unauthorized();
            workout.CreatedBy = userId;

            Workout? createdWorkout = await workoutService.Create(workout);
            return Results.Created($"/routines/{createdWorkout.Id}", createdWorkout.MapToResponse());
        }).RequireAuthorization();

        // read individual:
        group.MapGet("/{id:int}", async (IWorkoutService workoutService, int id, ClaimsPrincipal user) =>
        {
            string? userId = user.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (userId == null) return Results.Unauthorized();

            Workout? workout = await workoutService.GetById(id, userId);
            return (workout != null)? Results.Ok(workout.MapToResponse()) : Results.NotFound();
        }).RequireAuthorization();

        // read group:
        group.MapGet("/", async (IWorkoutService workoutService, int pageNumber, int pageSize, ClaimsPrincipal user) =>
        {
            string? userId = user.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (userId == null) return Results.Unauthorized();

            List<Workout> workoutList = await workoutService.GetPaginated(pageNumber, pageSize, userId);

            PaginatedResponse<WorkoutResponse> response = new PaginatedResponse<WorkoutResponse>
            {
                Items = workoutList
                        .Take(pageSize)
                        .Select(w => w.MapToResponse())
                        .ToList(),
                
                HasMore = workoutList.Count > pageSize
            };

            return Results.Ok(response);
        }).RequireAuthorization();

        // update:
        group.MapPut("/{id:int}", async (IWorkoutService workoutService, int id, UpdateFullWorkoutRequest request) => 
        {
            Workout? workout = request.MapToWorkout(id);
            WorkoutResponse workoutResponse = workout.MapToResponse();
            
            Workout? resultWorkout = await workoutService.DeepUpdate(workout);
            return (resultWorkout != null)? Results.Ok() : Results.NotFound();
        });

        // delete:
        group.MapDelete("/{id:int}", async (IWorkoutService workoutService, int id, ClaimsPrincipal user) => 
        {
            string? userId = user.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (userId == null) return Results.Unauthorized();

            Workout? workout = await workoutService.GetById(id, userId);
            if (workout == null) return Results.NotFound();

            if (workout.CreatedBy != userId) return Results.Unauthorized();

            bool workoutDeleted = await workoutService.DeleteById(id);
            return workoutDeleted? Results.Ok() : Results.NotFound();
        }).RequireAuthorization();
    }
}