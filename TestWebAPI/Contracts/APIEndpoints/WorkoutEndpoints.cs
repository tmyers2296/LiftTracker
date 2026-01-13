
public static class WorkoutEndpoints
{
    public static void MapWorkoutEndpoints(this WebApplication app) 
    {
        // * general routine group *
        var group = app.MapGroup("workouts");

        // create:
        group.MapPost("/", async (IWorkoutService workoutService, CreateFullWorkoutRequest request) => 
        {
            Workout workout = request.MapToWorkout();
            Workout? createdWorkout = await workoutService.Create(workout);
            return Results.Created($"/routines/{createdWorkout.Id}", createdWorkout.MapToResponse());
        });

        // read individual:
        group.MapGet("/{id:int}", async (IWorkoutService workoutService, int id) =>
        {
            Workout? workout = await workoutService.GetById(id);
            return (workout != null)? Results.Ok(workout.MapToResponse()) : Results.NotFound();
        });

        // read group:
        group.MapGet("/", async (IWorkoutService workoutService, int pageNumber, int pageSize) =>
        {
            List<Workout> workoutList = await workoutService.GetPaginated(pageNumber, pageSize);

            PaginatedResponse<WorkoutResponse> response = new PaginatedResponse<WorkoutResponse>
            {
                Items = workoutList
                .Take(pageSize)
                .Select(w => w.MapToResponse())
                .ToList(),
                
                HasMore = workoutList.Count > pageSize
            };

            return Results.Ok(response);
        });

        // update:
        group.MapPut("/{id:int}", async (IWorkoutService workoutService, int id, UpdateFullWorkoutRequest request) => 
        {
            Workout? workout = request.MapToWorkout(id);
            WorkoutResponse workoutResponse = workout.MapToResponse();
            //Console.WriteLine("!!!! Updated Routine: !!!!!");
            //Console.WriteLine(JsonSerializer.Serialize(routineResponse, new JsonSerializerOptions { WriteIndented = true }));
            Workout? resultWorkout = await workoutService.DeepUpdate(workout);
            return (resultWorkout != null)? Results.Ok() : Results.NotFound();
        });

        // delete:
        group.MapDelete("/{id:int}", async (IWorkoutService workoutService, int id) => 
        {
            bool routineDeleted = await workoutService.DeleteById(id);
            return routineDeleted? Results.Ok() : Results.NotFound();
        });
    }
}