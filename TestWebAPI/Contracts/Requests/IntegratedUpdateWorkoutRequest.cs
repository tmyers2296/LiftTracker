public class UpdateFullWorkoutRequest
{
    public required int Id { get; init; }
    public required string Date { get; init; }
    public required bool IsImprovised { get; init; }
    public required string Name { get; init; }
    public int RoutineId { get; init; }
    public required string CreatedBy { get; init; }
    public List<UpdateFullWorkoutExerciseRequest> Exercises { get; init; } = new();
}

public class UpdateFullWorkoutExerciseRequest
{
    public required int Id { get; init; }
    public required int ExerciseId { get; init; }
    public required int Order { get; init; }
    public List<UpdateFullWorkoutExerciseSetRequest> Sets { get; init; }  = new();
}

public class UpdateFullWorkoutExerciseSetRequest
{
    public required int Id { get; init; }
    public required int Weight { get; init; }
    public required int Reps { get; init; }
    public required int Order { get; init; }
}