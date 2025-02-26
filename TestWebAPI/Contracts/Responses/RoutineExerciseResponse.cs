public class RoutineExerciseResponse
{
    public required int Id { get; init; }

    public required int ExerciseId { get; init; }

    public required int RoutineId { get; init; }

    public required int Order { get; init; }

    public required List<RoutineExerciseSetResponse> setsList { get; init; }

}
