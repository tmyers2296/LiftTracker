public class UpdateRoutineExerciseSetRequest
{
    public required Guid RoutineExerciseId { get; init; }
    public required int RepRangeLow { get; init; }
    public required int RepRangeHigh { get; init; }

}
