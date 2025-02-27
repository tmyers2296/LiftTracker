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

    // update methods:
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
    Task<Routine?> GetById(int id);
    Task<RoutineExercise?> GetExercise(int id);
    Task<RoutineExerciseSet?> GetExerciseSet(int id);

    // update:
    Task<Routine?> Update(Routine routine);
    Task<RoutineExercise?> UpdateExercise(RoutineExercise routineExercise);
    Task<RoutineExerciseSet?> UpdateExerciseSet(RoutineExerciseSet routineExerciseSet);
    
    // delete:
    Task<bool> DeleteById(int id);
    Task<bool> DeleteExerciseById(int id);
    Task<bool> DeleteExerciseSetById(int id);
}