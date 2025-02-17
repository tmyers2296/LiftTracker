using System.Runtime.InteropServices;
using Microsoft.EntityFrameworkCore;

public class RoutineService : IRoutineService
{
    private readonly ApplicationDbContext _dbContext;
    public RoutineService(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Routine> Create(Routine routine)
    {
        _dbContext.Routines.Add(routine);
        await _dbContext.SaveChangesAsync();

        return routine;
    }

    public async Task<Routine?> GetById(Guid id)
    {
        return await _dbContext.Routines.FindAsync(id);
    }

    public async Task<Routine?> Update(Routine routine)
    {
          _dbContext.Routines.Update(routine);
          var result = await _dbContext.SaveChangesAsync();
           return result > 0 ? routine : null;
    }

    public async Task<bool> DeleteById(Guid id)
    {
        var result = await _dbContext.Routines.Where(x => x.Id == id).ExecuteDeleteAsync();
        return result > 0;
    }
}

public interface IRoutineService
{
    Task<Routine> Create(Routine routine);

    Task<Routine?> GetById(Guid id);

    Task<Routine?> Update(Routine routine);

    Task<bool> DeleteById(Guid id);
}