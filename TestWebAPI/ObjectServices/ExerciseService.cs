using System.Runtime.InteropServices;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.EntityFrameworkCore.Update;

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
    public async Task<ExercisePRResponse?> GetHeaviest(int exerciseId, string userId)
    {   
        List<int> currentUserWorkoutIds = await _dbContext.Workouts
                                            .Where(w => w.CreatedBy == userId)
                                            .Select(w => w.Id)
                                            .ToListAsync();

        ExercisePRResponse? results = await _dbContext.WorkoutExerciseSets
                        .Where(wes => wes.WorkoutExercise.ExerciseId == exerciseId && currentUserWorkoutIds.Contains(wes.WorkoutExercise.Workout.Id))
                        .OrderByDescending(wes => wes.Weight)
                        .Select(wes => new ExercisePRResponse
                        {
                            Id = wes.Id,
                            Reps = wes.Reps,
                            Weight = wes.Weight,
                            Order = wes.Order,
                            Date = wes.WorkoutExercise.Workout.Date
                        })
                        .FirstOrDefaultAsync();

        if (results != null)
        {
            return results;

        } else
        {
            return null;
            
        }
    }

    // public async Task<WorkoutExerciseSet?> GetMostVolume(int exerciseId, string userId)
    // {
    //     List<int> currentUserWorkoutIds = await _dbContext.Workouts
    //                                 .Where(w => w.CreatedBy == userId)
    //                                 .Select(w => w.Id)
    //                                 .ToListAsync();

    //     List<WorkoutExerciseSet> results = await _dbContext.WorkoutExerciseSets
    //                                     .Where(wes => wes.WorkoutExercise.ExerciseId == exerciseId && currentUserWorkoutIds.Contains(wes.WorkoutExercise.Workout.Id))
    //                                     .OrderByDescending(wes => wes.Weight * wes.Reps)
    //                                     .Take(1)
    //                                     .ToListAsync();

    //     if (results.Count == 1)
    //     {
    //         return results[0];

    //     } else
    //     {
    //         return null;
            
    //     }
    // }
}

public interface IExerciseService
{
    Task<Exercise> Create(Exercise exercise);

    Task<Exercise?> GetById(int id);

    Task<List<Exercise>> GetPaginated(int page, int pageSize, string userId);

    Task<Exercise?> Update(Exercise exercise);

    Task<bool> DeleteById(int id);

    // Query methods:
    public Task<ExercisePRResponse?> GetHeaviest(int exerciseId,  string userId);
    // public Task<ExercisePRResponse?> GetMostVolume(int exerciseId, string userId);
    
}
