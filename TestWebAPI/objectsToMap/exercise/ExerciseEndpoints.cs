using Microsoft.AspNetCore.Mvc;

public static class ExerciseEndpoints
{
    public static void MapExerciseEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("exercises");

        group.MapPost("/", async (IExerciseService exerciseService, CreateExerciseRequest request) =>
        {
            var exercise = request.MapToExercise();
            var createdExercise = await exerciseService.Create(exercise);
            return Results.Created($"/exercises/{createdExercise.Id}", createdExercise.MapToResponse());
        });

        group.MapGet("/{id:guid}", async (IExerciseService exerciseService, Guid id) => 
        {
            var resultExercise = await exerciseService.GetById(id);
            return (resultExercise != null)? Results.Ok(resultExercise.MapToResponse()) : Results.NotFound();
        });
    }
}