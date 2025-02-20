public class RoutineExerciseResponse
{
    public required Guid Id { get; init; }

    public required Guid ExerciseId { get; init; }

    public required Guid RoutineId { get; init; }

    public required int Order { get; init; }

    public required List<RoutineExerciseSetResponse> setsList { get; init; }

}
