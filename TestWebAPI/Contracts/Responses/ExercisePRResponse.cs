public class ExercisePRResponse
{
    public required int Id { get; init;}
    
    public required int Weight { get; init; }

    public required int Reps { get; init; }

    public required int Order { get; init; }

    public required DateTimeOffset Date { get; init; }

}
