using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class WorkoutExercise
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; init; }

    [ForeignKey("Exercise")]
    public required int ExerciseId { get; set; }

    [ForeignKey("Workout")]
    public required int WorkoutId { get; set; }
    
    public required int Order { get; set; }

}
