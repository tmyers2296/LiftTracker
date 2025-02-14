using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class WorkoutExerciseSet
{
    [Key]
    public required Guid Id { get; init; }

    [ForeignKey("WorkoutExercise")]
    public required Guid WorkoutExerciseId { get; set; }

    public required int Weight { get; set; }
    
    public required int Reps { get; set; }

}
