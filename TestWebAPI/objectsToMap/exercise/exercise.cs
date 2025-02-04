using System.ComponentModel.DataAnnotations;

public class Exercise
{
    [Key]
    public required Guid Id { get; init; }
    
    public required string Name { get; set; }

    public required string CreatedBy { get; set; }
}
