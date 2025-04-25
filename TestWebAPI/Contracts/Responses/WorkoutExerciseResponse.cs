public class WorkoutExerciseResponse
{
    public required int Id { get; init; }

    public required int ExerciseId { get; init; }

    public required int Order { get; init; }

    public required List<WorkoutExerciseSetResponse> Sets { get; init; }

}
