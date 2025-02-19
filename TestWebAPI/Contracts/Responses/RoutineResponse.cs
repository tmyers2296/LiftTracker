public class RoutineResponse
{
    public required Guid Id { get; init; }
    
    public required string Name { get; init; }

    public required string CreatedBy { get; init; }

    public required List<RoutineExerciseResponse> ExercisesList { get; init; }
}
