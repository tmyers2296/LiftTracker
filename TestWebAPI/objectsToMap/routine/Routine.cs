using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Routine
{
    public Routine()
    {
        // navigation properties:
        this.Exercises = new List<RoutineExercise>();
    }

    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; init; }
    
    public required string Name { get; set; }

    public required string CreatedBy { get; set; }

    // navigation properties:
    public virtual List<RoutineExercise> Exercises { get; set; }

}
