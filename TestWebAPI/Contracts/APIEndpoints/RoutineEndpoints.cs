public static class RoutineEndpoints
{
    public static void MapRoutineEndpoints(this WebApplication app)
    {
        // * general routine group *
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

        // * routine exercise group *
        var exerciseGroup = group.MapGroup("/{routineId:guid}/exercises");

        // create:
        exerciseGroup.MapPost("/", async (IRoutineService routineService, Guid routineId, CreateRoutineExerciseRequest request) => 
        {
            RoutineExercise exercise = request.MapToRoutineExercise(routineId);
            RoutineExercise? createdExercise = await routineService.CreateExercise(exercise);
            return Results.Created($"routines/{createdExercise.RoutineId}/exercises/{createdExercise.Id}", createdExercise.MapToResponse());
        });
        
        // read:
        exerciseGroup.MapGet("/", async (IRoutineService routineService, Guid routineId) =>
        {
            List<RoutineExercise> exerciseList = await routineService.GetExercises(routineId);
            return (exerciseList.Count > 0)? Results.Ok(exerciseList.MapToResponse()) : Results.NotFound();
        });

        // update:

        // delete:

        // * routine exercise set group *
        var setGroup = exerciseGroup.MapGroup("/{exerciseId:guid}/sets");

        // create:
        
        // read:

        // update:

        // delete:
    }
}