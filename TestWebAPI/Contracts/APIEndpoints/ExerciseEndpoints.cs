using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

public static class ExerciseEndpoints
{
    public static void MapExerciseEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("exercises");

        // create:
        group.MapPost("/", async (IExerciseService exerciseService, CreateExerciseRequest request, ClaimsPrincipal user) =>
        {
            string? userId = user.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (userId == null) return Results.Unauthorized();

            Exercise exercise = request.MapToExercise(userId);
            Exercise? createdExercise = await exerciseService.Create(exercise);
            return Results.Created($"/exercises/{createdExercise.Id}", createdExercise.MapToResponse());
        }).RequireAuthorization();

        // read individual:
        group.MapGet("/{id:int}", async (IExerciseService exerciseService, int id) => 
        {
            Exercise? resultExercise = await exerciseService.GetById(id);
            return (resultExercise != null)? Results.Ok(resultExercise.MapToResponse()) : Results.NotFound();
        });

        // read group:
        group.MapGet("/", async (IExerciseService exerciseService, int pageNumber, int pageSize, ClaimsPrincipal user) =>
        {
            string? userId = user.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (userId == null) return Results.Unauthorized();

            List<Exercise> exerciseList = await exerciseService.GetPaginated(pageNumber, pageSize, userId);
            return Results.Ok(new ExercisePaginatedResponse
            {
                Exercises = exerciseList
                    .Take(pageSize)
                    .Select(e => e.MapToResponse())
                    .ToList()
            });
        }).RequireAuthorization();

        // update:
        group.MapPut("/{id:int}", async (IExerciseService exerciseService, int id, UpdateExerciseRequest request, ClaimsPrincipal user) =>
        {
            string? userId = user.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (userId == null) return Results.Unauthorized();

            Exercise? existingExercise = await exerciseService.GetById(id);
            if (existingExercise == null) return Results.NotFound();
            if (existingExercise.IsSystemExercise) return Results.Forbid();
            if (existingExercise.CreatedByUserId != userId) return Results.Unauthorized();

            existingExercise.Name = request.Name;

            Exercise? resultExercise = await exerciseService.Update(existingExercise);
            return (resultExercise != null)? Results.Ok(resultExercise.MapToResponse()) : Results.NotFound();
        }).RequireAuthorization();

        // delete:
        group.MapDelete("/{id:int}", async (IExerciseService exerciseService, int id,  ClaimsPrincipal user) => 
        {
            string? userId = user.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (userId == null) return Results.Unauthorized();

            Exercise? exercise = await exerciseService.GetById(id);
            if (exercise == null) return Results.NotFound();
            if (exercise.IsSystemExercise) return Results.Forbid();
            if (exercise.CreatedByUserId != userId) return Results.Unauthorized();

            bool result = await exerciseService.DeleteById(id);
            return result ? Results.Ok() : Results.NotFound();
        }).RequireAuthorization();

        // Queries:
        group.MapGet("/{id:int}/heaviest", async (IExerciseService exerciseService, int id, ClaimsPrincipal user) => 
        {
            string? userId = user.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (userId == null) return Results.Unauthorized();

            ExercisePRResponse? resultWorkoutExerciseSetResponse = await exerciseService.GetHeaviest(id, userId);
            return (resultWorkoutExerciseSetResponse != null)? Results.Ok(resultWorkoutExerciseSetResponse) : Results.NotFound();

        }).RequireAuthorization();

        group.MapGet("/{id:int}/mostvolume", async (IExerciseService exerciseService, int id, ClaimsPrincipal user) => 
        {
            string? userId = user.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (userId == null) return Results.Unauthorized();

            ExercisePRResponse? resultWorkoutExerciseSetResponse = await exerciseService.GetMostVolume(id, userId);
            return (resultWorkoutExerciseSetResponse != null)? Results.Ok(resultWorkoutExerciseSetResponse) : Results.NotFound();
            
        }).RequireAuthorization();
        
    }


}
