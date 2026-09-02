using Microsoft.EntityFrameworkCore;

public class DashboardService : IDashboardService
{
    
    private readonly ApplicationDbContext _dbContext;
    public DashboardService(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }


}

public interface IDashboardService
{
    Task<Exercise> Create(Exercise exercise);

    Task<Exercise?> GetById(int id);

    Task<Exercise?> Update(Exercise exercise);

    Task<bool> DeleteById(int id);

}