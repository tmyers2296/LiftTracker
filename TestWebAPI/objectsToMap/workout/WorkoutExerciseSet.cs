using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class WorkoutExerciseSet
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; init; }

    [ForeignKey("WorkoutExercise")]
    public required int WorkoutExerciseId { get; set; }

    public required int Weight { get; set; }
    
    public required int Reps { get; set; }

    // navigation properties:
    public virtual WorkoutExercise? WorkoutExercise { get; set; }

}
