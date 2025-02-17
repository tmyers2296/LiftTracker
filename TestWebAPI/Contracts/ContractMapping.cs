public static class ContractMapping
{
    // exercise mapping methods:
    public static Exercise MapToExercise(this CreateExerciseRequest request)
    {
        return new Exercise
        {
            Id = Guid.NewGuid(),
            Name = request.Name,
            CreatedBy = request.CreatedBy
        };
    }

    public static Exercise MapToExercise(this UpdateExerciseRequest request, Guid id)
    {
        return new Exercise
        {
            Id = id,
            Name = request.Name,
            CreatedBy = request.CreatedBy
        };
    }


    public static ExerciseResponse MapToResponse(this Exercise exercise)
    {
        return new ExerciseResponse
        {
            Id = exercise.Id,
            Name = exercise.Name,
            CreatedBy = exercise.CreatedBy
        };
    }


    // routine mapping methods:
    public static Routine MapToRoutine(this CreateRoutineRequest request)
    {
        return new Routine
        {
            Id = Guid.NewGuid(),
            Name = request.Name,
            CreatedBy = request.CreatedBy
        };
    }

    public static RoutineResponse MapToResponse(this Routine routine)
    {
        return new RoutineResponse
        {
            Id = routine.Id,
            Name = routine.Name,
            CreatedBy = routine.CreatedBy
        };
    }

}
