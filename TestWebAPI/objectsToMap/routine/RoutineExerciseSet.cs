using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class RoutineExerciseSet
{
        public RoutineExerciseSet()
    {
        // navigation properties:
        this.routineExercise = null;
    }

    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; init; }

    [ForeignKey("RoutineExercise")]
    public required int RoutineExerciseId { get; set; }

    public required int RepRangeLow { get; set; }

    public required int RepRangeHigh { get; set; }

    // navigation properties:
    public  RoutineExercise? routineExercise { get; set; }

}
