using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class DashboardExercise
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; init; }
    
    public required int ExerciseId { get; set; }

    public required string Metric { get; set; }

    public virtual Exercise? Exercise { get; set; }
}
