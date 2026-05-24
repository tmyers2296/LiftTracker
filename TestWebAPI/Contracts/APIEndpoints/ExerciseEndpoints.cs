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
        group.MapGet("/", async (IExerciseService exerciseService, int pageNumber, int pageSize) =>
        {
            List<ExerciseResponse> exerciseList = await exerciseService.GetPaginated(pageNumber, pageSize);
            return Results.Ok(new ExercisePaginatedResponse
            {
                Exercises = exerciseList
            });
        });

        // update:
        group.MapPut("/{id:int}", async (IExerciseService exerciseService, int id, UpdateExerciseRequest request, ClaimsPrincipal user) =>
        {
            string? userId = user.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (userId == null) return Results.Unauthorized();

            Exercise? existingExercise = await exerciseService.GetById(id);
            if (existingExercise == null) return Results.NotFound();
            if (existingExercise.CreatedByUserId != userId) return Results.Unauthorized();

            Exercise? exercise = request.MapToExercise(id, existingExercise.CreatedByUserId);
            Exercise? resultExercise = await exerciseService.Update(exercise);
            return (resultExercise != null)? Results.Ok(resultExercise.MapToResponse()) : Results.NotFound();
        }).RequireAuthorization();

        // delete:
        group.MapDelete("/{id:int}", async (IExerciseService exerciseService, int id) => 
        {
            bool result = await exerciseService.DeleteById(id);
            return result? Results.Ok() : Results.NotFound();
        });
    }
}
