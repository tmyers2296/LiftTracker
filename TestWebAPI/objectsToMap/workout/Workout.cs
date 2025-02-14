using System.ComponentModel.DataAnnotations;

public class Workout
{
    [Key]
    public required Guid Id { get; init; }

    public required string Date { get; set; }
    
    public required string Type { get; set; }

    public required string CreatedBy { get; set; }
}
