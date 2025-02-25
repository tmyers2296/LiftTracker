public class UpdateRoutineExerciseRequest
{
    public required Guid ExerciseId { get; init; }
    public required Guid RoutineId { get; init; }    
    public required int Order { get; init; }

}
