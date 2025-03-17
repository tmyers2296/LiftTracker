using System.Collections.Immutable;
using System.Runtime.InteropServices;
using Microsoft.EntityFrameworkCore;

public class RoutineService : IRoutineService
{
    private readonly ApplicationDbContext _dbContext;
    public RoutineService(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    // create methods:
    public async Task<Routine> Create(Routine routine)
    {
        _dbContext.Routines.Add(routine);
        await _dbContext.SaveChangesAsync();
        return routine;
    }

    public async Task<RoutineExercise> CreateExercise(RoutineExercise exercise)
    {
        _dbContext.RoutineExercises.Add(exercise);
        await _dbContext.SaveChangesAsync();
        return exercise;
    }

    public async Task<RoutineExerciseSet> CreateExerciseSet(RoutineExerciseSet set)
    {
        _dbContext.RoutineExerciseSets.Add(set);
        await _dbContext.SaveChangesAsync();
        return set;
    }

    // read methods:
    public async Task<Routine?> GetById(int id) 
    {
        return await _dbContext.Routines
        .Include(r => r.Exercises)
        .ThenInclude(re => re.Exercise)
        .Include(r => r.Exercises)
        .ThenInclude(re => re.Sets)
        .FirstOrDefaultAsync(r => r.Id == id);
    }

    public async Task<RoutineExercise?> GetExercise(int id)
    {
        return await _dbContext.RoutineExercises
        .Include(res => res.Sets)
        .FirstOrDefaultAsync(re => re.Id == id);
    }

    public async Task<RoutineExerciseSet?> GetExerciseSet(int id)
    {
        return await _dbContext.RoutineExerciseSets.FindAsync(id);
    }

    public async Task<List<Routine>> GetPaginated(int page, int pageSize)
    {
        return await _dbContext.Routines
                .Include(r => r.Exercises)
                .ThenInclude(re => re.Exercise)
                .Include(r => r.Exercises)
                .ThenInclude(re => re.Sets)
                .OrderByDescending(r => r.Id)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
    }

    // update methods:
    public async Task<Routine?> DeepUpdate(Routine routineWithUpdates)
    {
        // return existing routine with same Id..
        Routine? routineToEdit = await _dbContext.Routines
        .Include(r => r.Exercises)
        .ThenInclude(re => re.Sets)
        .FirstOrDefaultAsync(r => r.Id == routineWithUpdates.Id);
        
        // break out of method if routine not found:
        if (routineToEdit == null)
        {
            return null;
        }

        // update fields for routine:
        routineToEdit.Name = routineWithUpdates.Name;

        // dictionary of exercises
        Dictionary<int, RoutineExercise> exercisesToEditDict = routineToEdit.Exercises.ToDictionary(e => e.Id);

        // iterate through routine exercises:
        foreach (RoutineExercise exerciseWithUpdates in routineWithUpdates.Exercises)
        {
            // if id == 0 create a new exercise:
            if (exerciseWithUpdates.Id == 0) 
            {
                // New exercise (Id = 0 means it's not in DB yet)
                routineToEdit.Exercises.Add(exerciseWithUpdates);
            }
            else
            {
                // set variable for current exercise to edit
                RoutineExercise exerciseToEdit = exercisesToEditDict[exerciseWithUpdates.Id];

                // Update existing exercise fields:
                exerciseToEdit.ExerciseId = exerciseWithUpdates.ExerciseId;
                exerciseToEdit.Order = exerciseWithUpdates.Order;

                // remove existing exercise from the dictionary of exercises to edit:
                exercisesToEditDict.Remove(exerciseWithUpdates.Id);

                // dictionary of sets
                Dictionary<int, RoutineExerciseSet> setsToEditDict = exerciseToEdit.Sets.ToDictionary(s => s.Id);

                // iterate through exercise sets:
                foreach (RoutineExerciseSet setWithUpdates in exerciseWithUpdates.Sets)
                {
                    // if id == 0 create a new set:
                    if (setWithUpdates.Id == 0)
                    {
                        // New exercise (Id = 0 means it's not in DB yet)
                        exerciseToEdit.Sets.Add(setWithUpdates);
                    }
                }
            }
        }
    
    }

    public async Task<Routine?> Update(Routine routine)
    {
        _dbContext.Routines.Update(routine);
        var result = await _dbContext.SaveChangesAsync();
        return result > 0 ? routine : null;
    }

    public async Task<RoutineExercise?> UpdateExercise(RoutineExercise routineExercise)
    {
        _dbContext.RoutineExercises.Update(routineExercise);
        var result = await _dbContext.SaveChangesAsync();
        return result > 0 ? routineExercise : null;
    }

    public async Task<RoutineExerciseSet?> UpdateExerciseSet(RoutineExerciseSet routineExerciseSet)
    {
        _dbContext.RoutineExerciseSets.Update(routineExerciseSet);
        var result = await _dbContext.SaveChangesAsync();
        return result > 0 ? routineExerciseSet : null;
    }

    // delete methods:
    public async Task<bool> DeleteById(int id)
    {
        var result = await _dbContext.Routines.Where(x => x.Id == id).ExecuteDeleteAsync();
        return result > 0;
    }

    public async Task<bool> DeleteExerciseById(int id)
    {
        var result = await _dbContext.RoutineExercises.Where(x => x.Id == id).ExecuteDeleteAsync();
        return result > 0;
    }

     public async Task<bool> DeleteExerciseSetById(int id)
    {
        var result = await _dbContext.RoutineExerciseSets.Where(x => x.Id == id).ExecuteDeleteAsync();
        return result > 0;
    }
}

public interface IRoutineService
{
    // create:
    Task<Routine> Create(Routine routine);
    Task<RoutineExercise> CreateExercise(RoutineExercise exercise);
    Task<RoutineExerciseSet> CreateExerciseSet(RoutineExerciseSet set);

    // read:
    // -> single:
    Task<Routine?> GetById(int id);
    Task<RoutineExercise?> GetExercise(int id);
    Task<RoutineExerciseSet?> GetExerciseSet(int id);

    // -> multiple:
    Task<List<Routine>> GetPaginated(int page, int pageSize);

    // update:
    Task<Routine?> DeepUpdate(Routine routine);
    Task<Routine?> Update(Routine routine);
    Task<RoutineExercise?> UpdateExercise(RoutineExercise routineExercise);
    Task<RoutineExerciseSet?> UpdateExerciseSet(RoutineExerciseSet routineExerciseSet);
    
    // delete:
    Task<bool> DeleteById(int id);
    Task<bool> DeleteExerciseById(int id);
    Task<bool> DeleteExerciseSetById(int id);
}