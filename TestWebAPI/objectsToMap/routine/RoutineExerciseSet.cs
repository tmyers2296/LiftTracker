using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class RoutineExerciseSet
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; init; }

    [ForeignKey("RoutineExercise")]
    public required int RoutineExerciseId { get; set; }

    public required int RepRangeLow { get; set; }

    public required int RepRangeHigh { get; set; }

    // navigation properties:
    public virtual RoutineExercise? RoutineExercise { get; set; }

}
