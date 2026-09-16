public class DashboardPRResponse
{
    public required int Id { get; init; }

    public required string CreatedByUserId { get; init; }

    public required List<DashboardExercisePRResponse> Exercises { get; init; }
}
