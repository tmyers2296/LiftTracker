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
        group.MapGet("/{id:guid}", async (IRoutineService routineService, Guid id) =>
        {
            Routine? routine = await routineService.GetById(id);
            return (routine != null)? Results.Ok(routine.MapToResponse()) : Results.NotFound();
        });

        // read group:

        // delete:
        group.MapDelete("/{id:guid}", async (IRoutineService routineService, Guid id) => 
        {
            bool routineDeleted = await routineService.DeleteById(id);
            return routineDeleted? Results.Ok() : Results.NotFound();
        });

    }
}