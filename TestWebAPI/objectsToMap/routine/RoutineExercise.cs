using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class RoutineExercise
{
    public RoutineExercise()
    {
        // navigation properties:
        this.routine = null;
        this.exercise = null;
        this.sets = new List<RoutineExerciseSet>();
    }

    [Key]
    public required Guid Id { get; init; }

    [ForeignKey("Exercise")]
    public required Guid ExerciseId { get; set; }

    [ForeignKey("Routine")]
    public required Guid RoutineId { get; set; }

    public required int Order { get; set; }

    // navigation properties:
    public Routine? routine { get; set; }
    public Exercise? exercise { get; set; }
    public List<RoutineExerciseSet> sets { get; set; } = new List<RoutineExerciseSet>();
}
