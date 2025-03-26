public class UpdateFullRoutineRequest
{
    public required int Id { get; init; }
    public required string Name { get; init; }
    public required string CreatedBy { get; init; }
    public List<UpdateFullRoutineExerciseRequest> Exercises { get; init; } = new();
}

public class UpdateFullRoutineExerciseRequest
{
    public required int Id { get; init; }
    public required int ExerciseId { get; init; }
    public required int Order { get; init; }
    public List<UpdateFullRoutineExerciseSetRequest> Sets { get; init; }  = new();
}

public class UpdateFullRoutineExerciseSetRequest
{
    public required int Id { get; init; }
    public required int RepRangeLow { get; init; }
    public required int RepRangeHigh { get; init; }
}