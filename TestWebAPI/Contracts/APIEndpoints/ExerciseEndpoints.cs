using Microsoft.AspNetCore.Mvc;

public static class ExerciseEndpoints
{
    public static void MapExerciseEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("exercises");

        // create:
        group.MapPost("/", async (IExerciseService exerciseService, CreateExerciseRequest request) =>
        {
            Exercise exercise = request.MapToExercise();
            Exercise? createdExercise = await exerciseService.Create(exercise);
            return Results.Created($"/exercises/{createdExercise.Id}", createdExercise.MapToResponse());
        });

        // read individual:
        group.MapGet("/{id:guid}", async (IExerciseService exerciseService, Guid id) => 
        {
            Exercise? resultExercise = await exerciseService.GetById(id);
            return (resultExercise != null)? Results.Ok(resultExercise.MapToResponse()) : Results.NotFound();
        });

        // read group:

        // update:
        group.MapPut("/{id:guid}", async (IExerciseService exerciseService, Guid id, UpdateExerciseRequest request) =>
        {
            Exercise? exercise = request.MapToExercise(id);
            Exercise? resultExercise = await exerciseService.Update(exercise);
            return (resultExercise != null)? Results.Ok() : Results.NotFound();
        });

        // delete:
        group.MapDelete("/{id:guid}", async (IExerciseService exerciseService, Guid id) => 
        {
            bool result = await exerciseService.DeleteById(id);
            return result? Results.Ok() : Results.NotFound();
        });
    }
}