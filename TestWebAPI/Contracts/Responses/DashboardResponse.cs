public class DashboardResponse
{
    public required int Id { get; init; }

    public required string CreatedByUserId { get; init; }

    public required List<DashboardExerciseResponse> Exercises { get; init; }
}
