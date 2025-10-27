using System.Data.Common;
using System.Text.Json;

public static class RoutineEndpoints
{
    public static void MapRoutineEndpoints(this WebApplication app)
    {
        // * general routine group *
        var group = app.MapGroup("routines");

        // create:
        group.MapPost("/", async (IRoutineService routineService, CreateFullRoutineRequest request) => 
        {
            Routine routine = request.MapToRoutine();
            Routine? createdRoutine = await routineService.Create(routine);
            return Results.Created($"/routines/{createdRoutine.Id}", createdRoutine.MapToResponse());
        });

        // read individual:
        group.MapGet("/{id:int}", async (IRoutineService routineService, int id) =>
        {
            Routine? routine = await routineService.GetById(id);
            return (routine != null)? Results.Ok(routine.MapToResponse()) : Results.NotFound();
        });

        // read group:
        group.MapGet("/", async (IRoutineService routineService, int pageNumber, int pageSize) =>
        {
            List<Routine> routineList= await routineService.GetPaginated(pageNumber, pageSize);
            return Results.Ok(routineList.MapToResponse());
        });

        // update:
        group.MapPut("/{id:int}", async (IRoutineService routineService, int id, UpdateFullRoutineRequest request) => 
        {
            Routine? routine = request.MapToRoutine(id);
            RoutineResponse routineResponse = routine.MapToResponse();
            Console.WriteLine("!!!! Updated Routine: !!!!!");
            Console.WriteLine(JsonSerializer.Serialize(routineResponse, new JsonSerializerOptions { WriteIndented = true }));
            Routine? resultRoutine = await routineService.DeepUpdate(routine);
            return (resultRoutine != null)? Results.Ok() : Results.NotFound();
        });

        // delete:
        group.MapDelete("/{id:int}", async (IRoutineService routineService, int id) => 
        {
            bool routineDeleted = await routineService.DeleteById(id);
            return routineDeleted? Results.Ok() : Results.NotFound();
        });

        // <!! individual nested object endpoints !!>
        // // * routine exercise group *
        // var exerciseGroupNested = group.MapGroup("/{routineId:int}/exercises");
        // var exerciseGroupDirect = app.MapGroup("/routine-exercises");

        // // create:
        // exerciseGroupDirect.MapPost("/", async (IRoutineService routineService, CreateRoutineExerciseRequest request) => 
        // {
        //     RoutineExercise exercise = request.MapToRoutineExercise();
        //     RoutineExercise? createdExercise = await routineService.CreateExercise(exercise);
        //     return Results.Created($"routine-exercises/{createdExercise.Id}", createdExercise.MapToResponse());
        // });
        
        // // read:
        // exerciseGroupNested.MapGet("/{exerciseId:int}", async (IRoutineService routineService, int routineId, int exerciseId) =>
        // {
        //     RoutineExercise? routineExercise = await routineService.GetExercise(exerciseId);
        //     return (routineExercise != null)? Results.Ok(routineExercise.MapToResponse()) : Results.NotFound();
        // });

        // // update:
        // exerciseGroupDirect.MapPut("/{exerciseId:int}", async (IRoutineService routineService, int exerciseId, UpdateRoutineExerciseRequest request) =>
        // {
        //     RoutineExercise? routineExercise = request.MapToRoutineExercise(exerciseId);
        //     RoutineExercise? resultRoutineExercise = await routineService.UpdateExercise(routineExercise);
        //     return (resultRoutineExercise != null)? Results.Ok() : Results.NotFound();
        // });

        // // delete:
        // exerciseGroupDirect.MapDelete("/{exerciseId:int}", async (IRoutineService routineService, int exerciseId) => 
        // {
        //     bool routineExerciseDeleted = await routineService.DeleteExerciseById(exerciseId);
        //     return routineExerciseDeleted? Results.Ok() : Results.NotFound();
        // });

        // // * routine exercise set group *
        // var setGroupNested = exerciseGroupNested.MapGroup("/{exerciseId:guid}/sets");
        // var setGroupDirect = app.MapGroup("/routine-exercise-sets");

        // // create:
        // setGroupDirect.MapPost("/", async (IRoutineService routineService, CreateRoutineExerciseSetRequest request) => 
        // {
        //     RoutineExerciseSet set = request.MapToRoutineExerciseSet();
        //     RoutineExerciseSet? createdSet = await routineService.CreateExerciseSet(set);
        //     return Results.Created($"/routine-exercise-sets/{createdSet.Id}", createdSet.MapToResponse());
        // });
        
        // // read:
        // setGroupNested.MapGet("/{setId:guid}", async (IRoutineService routineService, int routineId, int exerciseId, int setId) =>
        // {
        //     RoutineExerciseSet? routineExerciseSet = await routineService.GetExerciseSet(setId);
        //     return (routineExerciseSet != null)? Results.Ok(routineExerciseSet.MapToResponse()) : Results.NotFound();
        // });

        // // update:
        // setGroupDirect.MapPut("/{setId:guid}", async (IRoutineService routineService, int setId, UpdateRoutineExerciseSetRequest request) =>
        // {
        //     RoutineExerciseSet? routineExerciseSet = request.MapToRoutineExerciseSet(setId);
        //     RoutineExerciseSet? resultRoutineExerciseSet = await routineService.UpdateExerciseSet(routineExerciseSet);
        //     return (resultRoutineExerciseSet != null)? Results.Ok() : Results.NotFound();
        // });

        // // delete:
        // setGroupDirect.MapDelete("/{setId:guid}", async (IRoutineService routineService, int setId) => 
        // {
        //     bool routineExerciseSetDeleted = await routineService.DeleteExerciseSetById(setId);
        //     return routineExerciseSetDeleted? Results.Ok() : Results.NotFound();
        // });
    }
}