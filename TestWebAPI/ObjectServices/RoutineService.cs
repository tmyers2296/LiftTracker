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
    public async Task<Routine?> GetById(Guid id)
    {
        return await _dbContext.Routines.FindAsync(id);
    }

    public async Task<List<RoutineExercise>> GetExercises(Guid id)
    {
        return await _dbContext.RoutineExercises.Where(re => re.RoutineId == id).ToListAsync();
    }
    
    // update methods:
    public async Task<Routine?> Update(Routine routine)
    {
          _dbContext.Routines.Update(routine);
          var result = await _dbContext.SaveChangesAsync();
           return result > 0 ? routine : null;
    }

    // delete methods:
    public async Task<bool> DeleteById(Guid id)
    {
        var result = await _dbContext.Routines.Where(x => x.Id == id).ExecuteDeleteAsync();
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
    Task<Routine?> GetById(Guid id);
    Task<List<RoutineExercise>> GetExercises(Guid id);

    // update:
    Task<Routine?> Update(Routine routine);

    // delete:
    Task<bool> DeleteById(Guid id);
}