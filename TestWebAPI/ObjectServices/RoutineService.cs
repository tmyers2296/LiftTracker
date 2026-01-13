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
                .Take(pageSize + 1)
                .ToListAsync();
    }

    // update methods:
    public async Task<Routine?> DeepUpdate(Routine routineWithUpdates)
    {
        // return existing routine with same Id..
        Routine? routineToEdit = await _dbContext.Routines
        .AsSplitQuery() 
        .Include(r => r.Exercises)
        .ThenInclude(re => re.Sets)
        .FirstOrDefaultAsync(r => r.Id == routineWithUpdates.Id);
        
        // break out of method if routine not found:
        if (routineToEdit == null)
        {
            return null;
        }

        // make updates (use routine generated from update request to write to fields
        // loop through updated entities & make changes for equivalent entity in routineToEdit.

        // update routine:
        _dbContext.Entry(routineToEdit).CurrentValues.SetValues(routineWithUpdates);

        // get exercises to add, remove & edit (add & remove are both lists, edit is a dictionary with ids):
        List<RoutineExercise> exercisesToAdd = routineWithUpdates.Exercises.Where(e => e.Id == 0).ToList();
        Dictionary<int, RoutineExercise> exercisesToEdit = routineToEdit.Exercises.ToDictionary(e => e.Id, e=> e);
        List<RoutineExercise> exercisesToRemove = routineToEdit.Exercises
                        .Where(e => !routineWithUpdates.Exercises.Any(ue => ue.Id == e.Id))
                        .ToList();

        // remove exercises to remove:
        _dbContext.RoutineExercises.RemoveRange(exercisesToRemove);

        // iterate through exercises to add:
        foreach (RoutineExercise exercise in exercisesToAdd)
        {
            _dbContext.RoutineExercises.Add(exercise);
        }

        // iterate through exercises to edit:
        foreach (RoutineExercise updatedExercise in routineWithUpdates.Exercises.Where(e => e.Id != 0)){
            // apply changes for current exercise 
            RoutineExercise exerciseToEdit = exercisesToEdit[updatedExercise.Id];
            _dbContext.Entry(exerciseToEdit).CurrentValues.SetValues(updatedExercise);

            // get sets to edit, add & remove:
            Dictionary<int, RoutineExerciseSet> setsToEdit = exerciseToEdit.Sets.ToDictionary(s => s.Id, s => s);
            List<RoutineExerciseSet> setsToAdd = updatedExercise.Sets.Where(s => s.Id == 0).ToList();
            List<RoutineExerciseSet> setsToRemove = exerciseToEdit.Sets
                        .Where(s => !updatedExercise.Sets.Any(us => us.Id == s.Id))
                        .ToList();

            // remove sets to remove:
            _dbContext.RoutineExerciseSets.RemoveRange(setsToRemove);

            // iterate through sets to add:
            foreach (RoutineExerciseSet set in setsToAdd)
            {
                _dbContext.RoutineExerciseSets.Add(set);
            }

            // iterate through sets to edit:
            foreach (RoutineExerciseSet updatedSet in updatedExercise.Sets.Where(s => s.Id != 0)){
                RoutineExerciseSet setToEdit = setsToEdit[updatedSet.Id];
                _dbContext.Entry(setToEdit).CurrentValues.SetValues(updatedSet);
            }

        }

        // save changes:
        await _dbContext.SaveChangesAsync();

        // return the existing routine (with changes):
        return routineToEdit;
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