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

    public async Task<Exercise?> GetById(Guid id)
    {
        return await _dbContext.Exercises.FindAsync(id);
    }

    public async Task<Exercise?> Update(Exercise exercise)
    {
        _dbContext.Exercises.Update(exercise);
        int result = await _dbContext.SaveChangesAsync();
        return result > 0 ? exercise : null;
    }

    public async Task<bool> DeleteById(Guid id)
    {
        var result = await _dbContext.Exercises.Where(x => x.Id == id).ExecuteDeleteAsync();
        return result > 0;
    }
}

public interface IExerciseService
{
    Task<Exercise> Create(Exercise exercise);

    Task<Exercise?> GetById(Guid id);

    Task<Exercise?> Update(Exercise exercise);

    Task<bool> DeleteById(Guid id);
}