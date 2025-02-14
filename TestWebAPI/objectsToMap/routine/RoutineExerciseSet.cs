using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class RoutineExerciseSet
{
    [Key]
    public required Guid Id { get; init; }

    [ForeignKey("RoutineExercise")]
    public required Guid RoutineExerciseId { get; set; }

    public required int RepRangeLow { get; set; }

    public required int RepRangeHigh { get; set; }

}
