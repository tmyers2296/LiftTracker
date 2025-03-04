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
        group.MapGet("/{id:int}", async (IExerciseService exerciseService, int id) => 
        {
            Exercise? resultExercise = await exerciseService.GetById(id);
            return (resultExercise != null)? Results.Ok(resultExercise.MapToResponse()) : Results.NotFound();
        });

        // read group:
        group.MapGet("/", async (IExerciseService exerciseService, int pageNumber, int pageSize) =>
        {
            List<Exercise> exerciseList= await exerciseService.GetPaginated(pageNumber, pageSize);
            return Results.Ok(exerciseList.MapToResponse());
        });

        // update:
        group.MapPut("/{id:int}", async (IExerciseService exerciseService, int id, UpdateExerciseRequest request) =>
        {
            Exercise? exercise = request.MapToExercise(id);
            Exercise? resultExercise = await exerciseService.Update(exercise);
            return (resultExercise != null)? Results.Ok() : Results.NotFound();
        });

        // delete:
        group.MapDelete("/{id:int}", async (IExerciseService exerciseService, int id) => 
        {
            bool result = await exerciseService.DeleteById(id);
            return result? Results.Ok() : Results.NotFound();
        });
    }
}