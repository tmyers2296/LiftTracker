using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class RoutineExercise
{
    [Key]
    public required Guid Id { get; init; }

    [ForeignKey("Exercise")]
    public required Guid ExerciseId { get; set; }

    [ForeignKey("Routine")]
    public required Guid RoutineId { get; set; }

    public required int Order { get; set; }

}
