using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Routine
{
    public Routine()
    {
        // navigation properties:
        this.exercises = new List<RoutineExercise>();
    }

    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; init; }
    
    public required string Name { get; set; }

    public required string CreatedBy { get; set; }

    // navigation properties:
    public List<RoutineExercise> exercises { get; set; }

}
