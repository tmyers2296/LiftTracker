public class RoutineExerciseResponse
{
    public required int Id { get; init; }

    public required string ExerciseName { get; init; }

    public required int ExerciseId { get; init; }

    public required int Order { get; init; }

    public required List<RoutineExerciseSetResponse> Sets { get; init; }

}
