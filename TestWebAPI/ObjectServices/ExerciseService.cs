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

    public async Task<Exercise?> GetById(int id)
    {
        return await _dbContext.Exercises.FindAsync(id);
    }

    public async Task<List<ExerciseResponse>> GetPaginated(int page, int pageSize)
    {
        return await _dbContext.Exercises
                .Join(
                    _dbContext.Users,
                    exercise => exercise.CreatedByUserId,
                    user => user.Id,
                    (exercise, user) => new ExerciseResponse
                    {
                        Id = exercise.Id,
                        Name = exercise.Name,
                        CreatedByUserId = exercise.CreatedByUserId,
                        CreatedByUsername = user.UserName
                    })
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
    }

    public async Task<Exercise?> Update(Exercise exercise)
    {
        _dbContext.Exercises.Update(exercise);
        int result = await _dbContext.SaveChangesAsync();
        return result > 0 ? exercise : null;
    }

    public async Task<bool> DeleteById(int id)
    {
        var result = await _dbContext.Exercises.Where(x => x.Id == id).ExecuteDeleteAsync();
        return result > 0;
    }
}

public interface IExerciseService
{
    Task<Exercise> Create(Exercise exercise);

    Task<Exercise?> GetById(int id);

    Task<List<ExerciseResponse>> GetPaginated(int page, int pageSize);

    Task<Exercise?> Update(Exercise exercise);

    Task<bool> DeleteById(int id);
}