using Microsoft.AspNetCore.Mvc;

public static class ExerciseEndpoints
{
    public static void MapExerciseEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("exercises");

        group.MapPost("/", async (IExerciseService exerciseService, CreateMovieRequest request) =>
        {
            var exercise = request.MapToMovie();
            var result = await movieService.Create(movie);
            return result.Match<IResult>(
                _ => Results.CreatedAtRoute("GetMovie", new { id = movie.Id }, movie.MapToResponse()),
                failed => Results.BadRequest(failed.MapToResponse()));
        });


    }
}