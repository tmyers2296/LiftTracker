public class ExerciseResponse
{
    public required int Id { get; init; }
    
    public required string Name { get; init; }

    public required string CreatedByUserId { get; init; }

    public string? CreatedByUsername { get; init; }

}
