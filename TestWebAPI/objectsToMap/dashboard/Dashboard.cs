using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Dashboard
{
        public Dashboard()
    {
        // navigation properties:
        this.Exercises = new List<DashboardExercise>();
    }

    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]

    public int Id { get; init; }

    public required string CreatedByUserId { get; set; }

    // navigation properties:
    public virtual List<DashboardExercise> Exercises { get; set; }

}
