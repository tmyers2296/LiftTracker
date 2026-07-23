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

    public async Task<List<Exercise>> GetPaginated(int page, int pageSize, string userId)
    {
        return await _dbContext.Exercises
                .Where(e => e.CreatedByUserId == userId || e.IsSystemExercise == true)
                .OrderByDescending(r => r.Id)
                .Skip((page - 1) * pageSize)
                .Take(pageSize + 1)
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

    // Query Methods:
    public async Task<WorkoutExercise?> GetHeaviest(int exerciseId, string userId)
    {   
        var currentUserWorkoutIds = await _dbContext.Workouts
                                            .Where(w => w.CreatedBy == userId)
                                            .Select(w => w.Id)
                                            .ToListAsync();

        var result =  await _dbContext.WorkoutExercises
                        .Where(we => we.ExerciseId == exerciseId && currentUserWorkoutIds.Contains(we.WorkoutId))
                        .OrderByDescending(r => r.Id)
                        .Take(1)
                        .ToListAsync();

        if (result.Count > 0)
        {
            Console.WriteLine("Swag");
        } 

    }
}

public interface IExerciseService
{
    Task<Exercise> Create(Exercise exercise);

    Task<Exercise?> GetById(int id);

    Task<List<Exercise>> GetPaginated(int page, int pageSize, string userId);

    Task<Exercise?> Update(Exercise exercise);

    Task<bool> DeleteById(int id);

    // Query methods:
    public Task<WorkoutExercise?> GetHeaviest(int exerciseId);
    //public Task<WorkoutExercise?> GetMostVolume(int exerciseId);
    
}
