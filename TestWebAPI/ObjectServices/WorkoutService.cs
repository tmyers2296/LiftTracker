using System.Runtime.InteropServices;
using Microsoft.EntityFrameworkCore;

public class WorkoutService : IWorkoutService
{
    private readonly ApplicationDbContext _dbContext;
    public WorkoutService(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    // create:
    public async Task<Workout> Create(Workout workout)
    {
        _dbContext.Workouts.Add(workout);
        await _dbContext.SaveChangesAsync();

        return workout;
    }

    public async Task<WorkoutExercise> CreateExercise(WorkoutExercise workoutExercise){
        _dbContext.WorkoutExercises.Add(workoutExercise);
        await _dbContext.SaveChangesAsync();

        return workoutExercise;
    }

    public async Task<WorkoutExerciseSet> CreateSet(WorkoutExerciseSet set){
        _dbContext.WorkoutExerciseSets.Add(set);
        await _dbContext.SaveChangesAsync();

        return set;
    }

    public async Task<List<Workout>> GetPaginated(int page, int pageSize)
    {
        return await _dbContext.Workouts
                .Include(w => w.Exercises)
                .ThenInclude(we => we.Exercise)
                .Include(w => w.Exercises)
                .ThenInclude(we => we.Sets)
                .OrderByDescending(w => w.Id)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
    }


    // read:
    public async Task<Workout?> GetById(int id)
    {
        return await _dbContext.Workouts.FindAsync(id);
    }

    public async Task<WorkoutExercise?> GetExercise(int id)
    {
        return await _dbContext.WorkoutExercises.FindAsync(id);
    }

    public async Task<WorkoutExerciseSet?> GetExerciseSet(int id)
    {
        return await _dbContext.WorkoutExerciseSets.FindAsync(id);
    }

    // update:
    public async Task<Workout?> DeepUpdate(Workout workoutWithUpdates)
    {
        // return existing routine with same Id..
        Workout? workoutToEdit = await _dbContext.Workouts 
        .Include(w => w.Exercises)
        .ThenInclude(we => we.Sets)
        .FirstOrDefaultAsync(w => w.Id == workoutWithUpdates.Id);
        
        // break out of method if routine not found:
        if (workoutToEdit == null)
        {
            return null;
        }

        // make updates (use routine generated from update request to write to fields
        // loop through updated entities & make changes for equivalent entity in routineToEdit.

        // routine:
        _dbContext.Entry(workoutToEdit).CurrentValues.SetValues(workoutWithUpdates);
        Dictionary<int, WorkoutExercise> exercisesToEdit = workoutToEdit.Exercises.ToDictionary(e => e.Id, e=> e);

        // delete any nested objets no longer present in the routine:
        List<WorkoutExercise> exercisesToRemove = workoutToEdit.Exercises
                        .Where(e => !workoutWithUpdates.Exercises.Any(ue => ue.Id == e.Id))
                        .ToList();
        
        _dbContext.WorkoutExercises.RemoveRange(exercisesToRemove);

        // Iterate through routineExercises:
        foreach (WorkoutExercise updatedExercise in workoutWithUpdates.Exercises){
            WorkoutExercise exerciseToEdit = exercisesToEdit[updatedExercise.Id];
            _dbContext.Entry(exerciseToEdit).CurrentValues.SetValues(updatedExercise);
            Dictionary<int, WorkoutExerciseSet> setsToEdit = exerciseToEdit.Sets.ToDictionary(s => s.Id, s => s);

            // delete any nested objets no longer present in the Exercise:
            List<WorkoutExerciseSet> setsToRemove = exerciseToEdit.Sets
                        .Where(s => !updatedExercise.Sets.Any(us => us.Id == s.Id))
                        .ToList();

            _dbContext.WorkoutExerciseSets.RemoveRange(setsToRemove);

            // Iterate through routineExerciseSets:
            foreach (WorkoutExerciseSet updatedSet in updatedExercise.Sets){
                WorkoutExerciseSet setToEdit = setsToEdit[updatedSet.Id];
                _dbContext.Entry(setToEdit).CurrentValues.SetValues(updatedSet);
            }
        }

        // save changes:
        await _dbContext.SaveChangesAsync();

        // return the existing routine (with changes):
        return workoutToEdit;
    }

    public async Task<Workout?> Update(Workout workout)
    {
          _dbContext.Workouts.Update(workout);
          var result = await _dbContext.SaveChangesAsync();
           return result > 0 ? workout : null;
    }

    public async Task<WorkoutExercise?> UpdateExercise(WorkoutExercise exercise)
    {
          _dbContext.WorkoutExercises.Update(exercise);
          var result = await _dbContext.SaveChangesAsync();
           return result > 0 ? exercise : null;
    }

    public async Task<WorkoutExerciseSet?> UpdateExerciseSet(WorkoutExerciseSet set)
    {
          _dbContext.WorkoutExerciseSets.Update(set);
          var result = await _dbContext.SaveChangesAsync();
           return result > 0 ? set : null;
    }

    // delete:
    public async Task<bool> DeleteById(int id)
    {
        var result = await _dbContext.Workouts.Where(w => w.Id == id).ExecuteDeleteAsync();
        return result > 0;
    }

    public async Task<bool> DeleteExerciseById(int id)
    {
        var result = await _dbContext.WorkoutExercises.Where(we => we.Id == id).ExecuteDeleteAsync();
        return result > 0;
    }

    public async Task<bool> DeleteExerciseSetById(int id)
    {
        var result = await _dbContext.WorkoutExerciseSets.Where(wes => wes.Id == id).ExecuteDeleteAsync();
        return result > 0;
    }
}

public interface IWorkoutService
{
    // create:
    Task<Workout> Create(Workout workout);
    Task<WorkoutExercise> CreateExercise(WorkoutExercise exercise);
    Task<WorkoutExerciseSet> CreateSet(WorkoutExerciseSet set);


    // read:
    // -> single:
    Task<Workout?> GetById(int id);
    Task<WorkoutExercise?> GetExercise(int id);
    Task<WorkoutExerciseSet?> GetExerciseSet(int id);

    // -> multiple:
    Task<List<Workout>> GetPaginated(int page, int pageSize);

    // update:
    Task<Workout?> DeepUpdate(Workout workout);
    Task<Workout?> Update(Workout workout);
    Task<WorkoutExercise?> UpdateExercise(WorkoutExercise workoutExercise);
    Task<WorkoutExerciseSet?> UpdateExerciseSet(WorkoutExerciseSet workoutExerciseSet);

    // delete:
    Task<bool> DeleteById(int id);
    Task<bool> DeleteExerciseById(int id);
    Task<bool> DeleteExerciseSetById(int id);
}