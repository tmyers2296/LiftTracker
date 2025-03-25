public class CreateFullRoutineRequest
{
    public required string Name { get; init; }
    public required string CreatedBy { get; init; }
    public List<CreateFullRoutineExerciseRequest> Exercises { get; init; } = new();
}

public class CreateFullRoutineExerciseRequest
{
    public required int ExerciseId { get; init; }
    public required int Order { get; init; }
    public List<CreateFullRoutineExerciseSetRequest> Sets { get; init; }  = new();
}

public class CreateFullRoutineExerciseSetRequest
{
    public required int RepRangeLow { get; init; }
    public required int RepRangeHigh { get; init; }
}