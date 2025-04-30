using System.Runtime.InteropServices;
using Microsoft.EntityFrameworkCore;
using System.Data.Common;
using System.Text.Json;

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

    // read:
    public async Task<Workout?> GetById(int id)
    {
        return await _dbContext.Workouts
        .Include(w => w.Exercises)
        .ThenInclude(we => we.Exercise)
        .Include(w => w.Exercises)
        .ThenInclude(we => we.Sets)
        .FirstOrDefaultAsync(w => w.Id == id);
    }

    public async Task<WorkoutExercise?> GetExercise(int id)
    {
        return await _dbContext.WorkoutExercises.FindAsync(id);
    }

    public async Task<WorkoutExerciseSet?> GetExerciseSet(int id)
    {
        return await _dbContext.WorkoutExerciseSets.FindAsync(id);
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


    // update:
    public async Task<Workout?> DeepUpdate(Workout workoutWithUpdates)
    {
        // return existing workout with same Id..
        Workout? workoutToEdit = await _dbContext.Workouts 
        .Include(w => w.Exercises)
        .ThenInclude(we => we.Sets)
        .FirstOrDefaultAsync(w => w.Id == workoutWithUpdates.Id);
        
        // break out of method if workout not found:
        if (workoutToEdit == null)
        {
            return null;
        }

        // make updates (use workout generated from update request to write to fields
        // loop through updated entities & make changes for equivalent entity in workoutToEdit.

        // update workout:
        _dbContext.Entry(workoutToEdit).CurrentValues.SetValues(workoutWithUpdates);

        // get exercises to add, remove & edit (add & remove are both lists, edit is a dictionary with ids):
        List<WorkoutExercise> exercisesToAdd = workoutWithUpdates.Exercises.Where(e => e.Id == 0).ToList();
        Dictionary<int, WorkoutExercise> exercisesToEdit = workoutToEdit.Exercises.ToDictionary(e => e.Id, e=> e);
        List<WorkoutExercise> exercisesToRemove = workoutToEdit.Exercises
                        .Where(e => !workoutWithUpdates.Exercises.Any(ue => ue.Id == e.Id))
                        .ToList();

        // remove exercises to remove:
        _dbContext.WorkoutExercises.RemoveRange(exercisesToRemove);

        // iterate through exercises to add:
        foreach (WorkoutExercise exercise in exercisesToAdd)
        {
            _dbContext.WorkoutExercises.Add(exercise);
        }

        // iterate through exercises to edit:
        foreach (WorkoutExercise updatedExercise in workoutWithUpdates.Exercises.Where(e => e.Id != 0)){
            // apply changes for current exercise 
            WorkoutExercise exerciseToEdit = exercisesToEdit[updatedExercise.Id];
            _dbContext.Entry(exerciseToEdit).CurrentValues.SetValues(updatedExercise);

            // get sets to edit, add & remove:
            Dictionary<int, WorkoutExerciseSet> setsToEdit = exerciseToEdit.Sets.ToDictionary(s => s.Id, s => s);
            List<WorkoutExerciseSet> setsToAdd = updatedExercise.Sets.Where(s => s.Id == 0).ToList();
            List<WorkoutExerciseSet> setsToRemove = exerciseToEdit.Sets
                        .Where(s => !updatedExercise.Sets.Any(us => us.Id == s.Id))
                        .ToList();

            // remove sets to remove:
            _dbContext.WorkoutExerciseSets.RemoveRange(setsToRemove);

            // iterate through sets to add:
            foreach (WorkoutExerciseSet set in setsToAdd)
            {
                _dbContext.WorkoutExerciseSets.Add(set);
            }

            // iterate through sets to edit:
            foreach (WorkoutExerciseSet updatedSet in updatedExercise.Sets){
                WorkoutExerciseSet setToEdit = setsToEdit[updatedSet.Id];
                _dbContext.Entry(setToEdit).CurrentValues.SetValues(updatedSet);
            }
        }

        // save changes:
        await _dbContext.SaveChangesAsync();

        // return the existing workout (with changes):
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