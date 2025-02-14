using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class WorkoutExercise
{
    [Key]
    public required Guid Id { get; init; }

    [ForeignKey("Exercise")]
    public required Guid ExerciseId { get; set; }

    [ForeignKey("Workout")]
    public required Guid WorkoutId { get; set; }
    
    public required int Order { get; set; }

}
