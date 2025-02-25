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
        var exerciseGroupNested = group.MapGroup("/{routineId:guid}/exercises");
        var exerciseGroupDirect = app.MapGroup("/routine-exercises");

        // create:
        exerciseGroupDirect.MapPost("/", async (IRoutineService routineService, CreateRoutineExerciseRequest request) => 
        {
            RoutineExercise exercise = request.MapToRoutineExercise();
            RoutineExercise? createdExercise = await routineService.CreateExercise(exercise);
            return Results.Created($"routine-exercises/{createdExercise.Id}", createdExercise.MapToResponse());
        });
        
        // read:
        exerciseGroupNested.MapGet("/{exerciseId:guid}", async (IRoutineService routineService, Guid routineId, Guid exerciseId) =>
        {
            RoutineExercise? routineExercise = await routineService.GetExercise(exerciseId);
            return (routineExercise != null)? Results.Ok(routineExercise.MapToResponse()) : Results.NotFound();
        });

        // update:
        

        // delete:
        exerciseGroupDirect.MapDelete("/{exerciseId:guid}", async (IRoutineService routineService, Guid exerciseId) => 
        {
            bool routineExerciseDeleted = await routineService.DeleteExerciseById(exerciseId);
            return routineExerciseDeleted? Results.Ok() : Results.NotFound();
        });

        // * routine exercise set group *
        var setGroupNested = exerciseGroupNested.MapGroup("/{exerciseId:guid}/sets");
        var setGroupDirect = app.MapGroup("/routine-exercise-sets");

        // create:
        setGroupDirect.MapPost("/", async (IRoutineService routineService, CreateRoutineExerciseSetRequest request) => 
        {
            RoutineExerciseSet set = request.MapToRoutineExerciseSet();
            RoutineExerciseSet? createdSet = await routineService.CreateExerciseSet(set);
            return Results.Created($"/routine-exercise-sets/{createdSet.Id}", createdSet.MapToResponse());
        });
        
        // read:
        setGroupNested.MapGet("/{setId:guid}", async (IRoutineService routineService, Guid routineId, Guid exerciseId, Guid setId) =>
        {
            RoutineExerciseSet? routineExerciseSet = await routineService.GetExerciseSet(setId);
            return (routineExerciseSet != null)? Results.Ok(routineExerciseSet.MapToResponse()) : Results.NotFound();
        });

        // update:

        // delete:
        setGroupDirect.MapDelete("/{setId:guid}", async (IRoutineService routineService, Guid setId) => 
        {
            bool routineExerciseSetDeleted = await routineService.DeleteExerciseSetById(setId);
            return routineExerciseSetDeleted? Results.Ok() : Results.NotFound();
        });
    }
}