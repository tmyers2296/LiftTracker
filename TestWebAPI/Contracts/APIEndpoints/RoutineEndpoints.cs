using System.Data.Common;
using System.Text.Json;
using System.Security.Claims;

public static class RoutineEndpoints
{
    public static void MapRoutineEndpoints(this WebApplication app)
    {
        // * general routine group *
        var group = app.MapGroup("routines");

        // create:
        group.MapPost("/", async (IRoutineService routineService, CreateFullRoutineRequest request, ClaimsPrincipal user) => 
        {
            Console.WriteLine("!!!! Creating Routine: !!!!!");
            Console.WriteLine(user.Identity?.IsAuthenticated);
            var userId = user.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            Routine routine = request.MapToRoutine();

            if (userId == null) return Results.Unauthorized();
            routine.CreatedBy = userId;

            Routine? createdRoutine = await routineService.Create(routine);
            return Results.Created($"/routines/{createdRoutine.Id}", createdRoutine.MapToResponse());
        }).RequireAuthorization();

        // read individual:
        group.MapGet("/{id:int}", async (IRoutineService routineService, int id) =>
        {
            Routine? routine = await routineService.GetById(id);
            return (routine != null)? Results.Ok(routine.MapToResponse()) : Results.NotFound();
        });

        // read group:
        group.MapGet("/", async (IRoutineService routineService, int pageNumber, int pageSize) =>
        {
            List<Routine> routineList = await routineService.GetPaginated(pageNumber, pageSize);

            PaginatedResponse<RoutineResponse> response = new PaginatedResponse<RoutineResponse> {
                Items = routineList
                        .Take(pageSize)
                        .Select(r => r.MapToResponse())
                        .ToList(),

                HasMore = routineList.Count > pageSize
            };
            
            return response;
        });

        // update:
        group.MapPut("/{id:int}", async (IRoutineService routineService, int id, UpdateFullRoutineRequest request, ClaimsPrincipal user) => 
        {
            Routine? routine = request.MapToRoutine(id);

            var userId = user.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (userId == null || routine.CreatedBy != userId) return Results.Unauthorized();
            RoutineResponse routineResponse = routine.MapToResponse();
            Routine? resultRoutine = await routineService.DeepUpdate(routine);
            RoutineResponse newRoutineResponse = routine.MapToResponse();
            return (resultRoutine != null)? Results.Ok(newRoutineResponse) : Results.NotFound();
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