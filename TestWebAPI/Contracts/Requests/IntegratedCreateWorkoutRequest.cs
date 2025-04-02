public class CreateFullWorkoutRequest
{
    public required string Date { get; init; }
    public required bool IsImprovised { get; init; }
    public required string Name { get; init; }
    public int RoutineId { get; init; }
    public required string CreatedBy { get; init; }
    public List<CreateFullWorkoutExerciseRequest> Exercises { get; init; } = new();
}

public class CreateFullWorkoutExerciseRequest
{
    public required int ExerciseId { get; init; }
    public required int Order { get; init; }
    public List<CreateFullWorkoutExerciseSetRequest> Sets { get; init; }  = new();
}

public class CreateFullWorkoutExerciseSetRequest
{
    public required int WorkoutExerciseId { get; init; }
    public required int Weight { get; init; }
    public required int Reps { get; init; }
    public required int Order { get; init; }
}