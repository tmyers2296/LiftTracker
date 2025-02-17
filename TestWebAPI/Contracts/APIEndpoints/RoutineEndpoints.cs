public static class RoutineEndpoints
{
    public static void MapRoutineEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("routines");

        // create:
        group.MapPost("/", async (IRoutineService routineService, CreateRoutineRequest request) => 
        {
            Routine routine = request.MapToRoutine();
            Routine? createdRoutine = await routineService.Create(routine);
            return Results.Created($"/routines/{createdRoutine.Id}", createdRoutine.MapToResponse());
        });

        // read individual:

        // read group:

        // delete:

    }
}