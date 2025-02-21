public class CreateRoutineExerciseRequest
{
    public required Guid ExerciseId { get; set; }
    public required Guid RoutineId { get; set; }
    public required int Order { get; set; }

}
