using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Workout
{
     public Workout()
    {
        // navigation properties:
        this.Exercises = new List<WorkoutExercise>();
    }

    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; init; }

    public required string Date { get; set; }

    public required bool IsImprovised { get; set; }
    public required string Name { get; set; }

    [ForeignKey("Routine")]
    public required int? RoutineId { get; set; }
    public required string CreatedBy { get; set; }

    // navigation properties:
    public virtual List<WorkoutExercise> Exercises { get; set; }
    public virtual Routine? Routine { get; set; }

}
