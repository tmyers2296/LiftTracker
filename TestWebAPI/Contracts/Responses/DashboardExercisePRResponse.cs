public class DashboardExercisePRResponse
{
    public required int Id { get; init; }

    public required int DashboardId { get; set; }

    public required string ExerciseName { get; init; }
    
    public required int ExerciseId { get; set; }

    public required string Metric { get; set; }

    public required ExercisePRResponse PRdata { get; set; }

    public required int Order { get; set; }

}
