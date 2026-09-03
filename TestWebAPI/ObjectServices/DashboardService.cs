using Microsoft.EntityFrameworkCore;

public class DashboardService : IDashboardService
{
    
    private readonly ApplicationDbContext _dbContext;
    public DashboardService(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;

    }

    public async Task<Dashboard> Create(Dashboard dashboard)
    {
        _dbContext.Dashboards.Add(dashboard);
        await _dbContext.SaveChangesAsync();
        return dashboard;
    }

    public async Task<Dashboard?> GetById(int id)
    {
        return await _dbContext.Dashboards.FindAsync(id);
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

    Task<Dashboard?> GetById(int id);

    Task<Dashboard?> Update(Dashboard dashboard);

    Task<bool> DeleteById(int id);

}