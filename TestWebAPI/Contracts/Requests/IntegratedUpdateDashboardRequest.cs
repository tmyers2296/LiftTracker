public class UpdateDashboardRequest
{
    public required int Id { get; init; }
    public List<CreateDashboardExerciseRequest> Exercises { get; init; } = new(); 

}

public class UpdateDashboardExerciseRequest
{
    public required int Id { get; init; }
    public required int ExerciseId { get; init; }
    public required string Metric { get; init; }
    public required int Order { get; init; }

}