using System.Runtime.InteropServices;
using Microsoft.EntityFrameworkCore;

public class ExerciseService : IExerciseService
{
    private readonly ApplicationDbContext _dbContext;
    public ExerciseService(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Exercise> Create(Exercise exercise)
    {
        _dbContext.Exercises.Add(exercise);
        await _dbContext.SaveChangesAsync();

        return exercise;
    }
}

public interface IExerciseService
{
    Task<Exercise> Create(Exercise exercise);
}