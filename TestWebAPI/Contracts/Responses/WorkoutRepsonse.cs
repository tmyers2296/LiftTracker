public class WorkoutResponse
{
    public required int Id { get; init; }

    public required string Name { get; init;}

    public required DateTimeOffset Date { get; init; }

    public required bool IsImprovised { get; init; }

    public required string CreatedBy { get; init; }

    public required List<WorkoutExerciseResponse> Exercises { get; init; }
}
