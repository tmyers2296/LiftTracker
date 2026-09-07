public class CreateDashboardRequest
{

    public List<CreateDashboardExerciseRequest> Exercises { get; init; } = new(); 

}

public class CreateDashboardExerciseRequest
{
    public required int ExerciseId { get; init; }
    
    public required string Metric { get; init; }

    public required int Order { get; init; }

}