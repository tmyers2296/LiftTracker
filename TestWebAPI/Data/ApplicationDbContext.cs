using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }
    
    // excercise relations:
    public DbSet<Exercise> Exercises { get; set; }

    // routine relations:
    public DbSet<Routine> Routines { get; set; }
    public DbSet<RoutineExercise> RoutineExercises { get; set; }
    public DbSet<RoutineExerciseSet> RoutineExerciseSets { get; set; }

    // workout relations
    public DbSet<Workout> Workout { get; set; }
    public DbSet<WorkoutExercise> WorkoutExercise { get; set; }
    public DbSet<WorkoutExerciseSet> WorkoutExerciseSet { get; set; }
    
}