using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class WorkoutExercise
{    
    public WorkoutExercise()
    {
        // navigation properties:
        this.Sets = new List<WorkoutExerciseSet>();
    }

    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; init; }

    [ForeignKey("Exercise")]
    public required int ExerciseId { get; set; }

    [ForeignKey("Workout")]
    public required int WorkoutId { get; set; }
    
    public required int Order { get; set; }

    // navigation properties:
    public virtual Workout? Workout { get; set; }
    public virtual Exercise? Exercise { get; set; }
    public virtual List<WorkoutExerciseSet> Sets { get; set; }

}
