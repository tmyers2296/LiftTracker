public class RoutineExerciseSetResponse
{
    public required Guid Id { get; init;}
    public required Guid RoutineExerciseId { get; init; }

    public required int RepRangeLow { get; init; }

    public required int RepRangeHigh { get; init; }

}
