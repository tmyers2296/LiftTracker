using System.ComponentModel.DataAnnotations;

public class Routine
{
    public Routine()
    {
        // navigation properties:
        this.exercises = new List<RoutineExercise>();
    }

    [Key]
    public required Guid Id { get; init; }
    
    public required string Name { get; set; }

    public required string CreatedBy { get; set; }

    // navigation properties:
    public List<RoutineExercise> exercises { get; set; }

}
