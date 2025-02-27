using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class RoutineExercise
{
    public RoutineExercise()
    {
        // navigation properties:
        this.Sets = new List<RoutineExerciseSet>();
    }

    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; init; }

    [ForeignKey("Exercise")]
    public required int ExerciseId { get; set; }

    [ForeignKey("Routine")]
    public required int RoutineId { get; set; }

    public required int Order { get; set; }

    // navigation properties:
    public virtual Routine? Routine { get; set; }
    public virtual Exercise? Exercise { get; set; }
    public virtual List<RoutineExerciseSet> Sets { get; set; } = new List<RoutineExerciseSet>();
}
