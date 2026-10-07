using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

public class DashboardService : IDashboardService
{
    
    private readonly ApplicationDbContext _dbContext;
    private readonly IExerciseService _exerciseService;

    public DashboardService(ApplicationDbContext dbContext, IExerciseService exerciseService)
    {
        _dbContext = dbContext;
        _exerciseService = exerciseService;

    }

    public async Task<Dashboard> Create(Dashboard dashboard)
    {
        _dbContext.Dashboards.Add(dashboard);
        await _dbContext.SaveChangesAsync();
        return dashboard;
    }

    public async Task<Dashboard?> GetById(int id, string userId) 
    {
        return await _dbContext.Dashboards
        .Where(d => d.CreatedByUserId == userId)
        .Include(d => d.Exercises)
        .ThenInclude(de => de.Exercise)
        .FirstOrDefaultAsync(d => d.Id == id);
    }

    // get current user dashboard
    public async Task<Dashboard?> GetByUserId(string userId) 
    {
        return await _dbContext.Dashboards
        .Where(d => d.CreatedByUserId == userId)
        .Include(d => d.Exercises)
        .ThenInclude(de => de.Exercise)
        .FirstOrDefaultAsync();
    }

        public async Task<Dashboard?> GetByUserIdWithMetrics(string userId) 
    {

        Dictionary<string, Func<int, string, Task<ExercisePRResponse?>>> metricFunctionsLookup = new Dictionary<string, Func<int, string, Task<ExercisePRResponse?>>>
        {
            ["heaviest"] = _exerciseService.GetHeaviest,
            ["volume"] =  _exerciseService.GetMostVolume
        };

        var dashboard = await _dbContext.Dashboards
        .Where(d => d.CreatedByUserId == userId)
        .Include(d => d.Exercises)
        .ThenInclude(de => de.Exercise)
        .FirstOrDefaultAsync();

        if (dashboard == null) return null;

        // create PR response object for dashboard
        var dashboardPRResponse = new DashboardPRResponse
        {
            Id = dashboard.Id,
            CreatedByUserId = dashboard.CreatedByUserId,
            Exercises = new List<DashboardExercisePRResponse>()
        };

        // query result for each exercise
        foreach (DashboardExercise exerciseToQuery in dashboard.Exercises)
        {
            // run query
            ExercisePRResponse? heaviestWorkoutExerciseSetResponse = await _exerciseService.GetHeaviest(exerciseToQuery.ExerciseId, userId);

            // append exercise response to pr dashboard response
        }

        // return the nested response object
    }


    public async Task<Dashboard?> DeepUpdate(Dashboard dashboardWithUpdates)
    {
        // return existing dashboard with same Id..
        Dashboard? dashboardToEdit = await _dbContext.Dashboards
        .AsSplitQuery() 
        .Include(d => d.Exercises)
        .FirstOrDefaultAsync(d => d.Id == dashboardWithUpdates.Id);
        
        // break out of method if dashboard not found:
        if (dashboardToEdit == null) return null;

        // make updates (use dashboard generated from update request to write to fields
        // loop through updated entities & make changes for equivalent entity in dashboardToEdit.

        string originalCreatedBy = dashboardToEdit.CreatedByUserId;

        // update dashboard:
        _dbContext.Entry(dashboardToEdit).CurrentValues.SetValues(dashboardWithUpdates);

        // get exercises to add, remove & edit (add & remove are both lists, edit is a dictionary with ids):
        List<DashboardExercise> exercisesToAdd = dashboardWithUpdates.Exercises.Where(e => e.Id == 0).ToList();
        Dictionary<int, DashboardExercise> exercisesToEdit = dashboardToEdit.Exercises.ToDictionary(e => e.Id, e=> e);
        List<DashboardExercise> exercisesToRemove = dashboardToEdit.Exercises
                        .Where(e => !dashboardWithUpdates.Exercises.Any(ue => ue.Id == e.Id))
                        .ToList();

        // remove exercises to remove:
        _dbContext.DashboardExercises.RemoveRange(exercisesToRemove);

        // iterate through exercises to add:
        foreach (DashboardExercise exercise in exercisesToAdd)
        {
            _dbContext.DashboardExercises.Add(exercise);
        }

        // iterate through exercises to edit:
        foreach (DashboardExercise updatedExercise in dashboardWithUpdates.Exercises.Where(e => e.Id != 0)){
            // apply changes for current exercise 
            DashboardExercise exerciseToEdit = exercisesToEdit[updatedExercise.Id];
            _dbContext.Entry(exerciseToEdit).CurrentValues.SetValues(updatedExercise);

        }

        dashboardToEdit.CreatedByUserId = originalCreatedBy;

        // save changes:
        await _dbContext.SaveChangesAsync();

        // return the existing dashboard (with changes):
        return dashboardToEdit;
    }

    public async Task<Dashboard?> Update(Dashboard dashboard)
    {
        _dbContext.Dashboards.Update(dashboard);
        int result = await _dbContext.SaveChangesAsync();
        return result > 0 ? dashboard : null;
    }

    public async Task<bool> DeleteById(int id)
    {
        var result = await _dbContext.Dashboards.Where(x => x.Id == id).ExecuteDeleteAsync();
        return result > 0;
    }


}

public interface IDashboardService
{
    Task<Dashboard> Create(Dashboard dashboard);

    Task<Dashboard?> GetById(int id, string userId);

    Task<Dashboard?> GetByUserId(string userId);

    Task<Dashboard?> GetByUserIdWithMetrics(string userId);

    Task<Dashboard?> DeepUpdate(Dashboard dashboard);

    Task<Dashboard?> Update(Dashboard dashboard);

    Task<bool> DeleteById(int id);

}