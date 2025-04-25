public class RoutineResponse
{
    public required int Id { get; init; }
    
    public required string Name { get; init; }

    public required string CreatedBy { get; init; }

    public required List<RoutineExerciseResponse> Exercises { get; init; }
}
