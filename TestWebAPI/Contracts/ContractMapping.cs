public static class ContractMapping
{
    // * exercise mapping methods *
    // request -> object:
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


    // object -> response:
    public static ExerciseResponse MapToResponse(this Exercise exercise)
    {
        return new ExerciseResponse
        {
            Id = exercise.Id,
            Name = exercise.Name,
            CreatedBy = exercise.CreatedBy
        };
    }

    // * routine mapping methods *
    // request -> object:
    public static Routine MapToRoutine(this CreateRoutineRequest request)
    {
        return new Routine
        {
            Id = Guid.NewGuid(),
            Name = request.Name,
            CreatedBy = request.CreatedBy
        };
    }

    public static RoutineExercise MapToRoutineExercise(this CreateRoutineExerciseRequest request, Guid routineId)
    {
        return new RoutineExercise
        {
            Id = Guid.NewGuid(),
            ExerciseId = request.ExerciseId,
            RoutineId = routineId,
            Order = request.Order
        };
    }

    public static RoutineExerciseSet MapToRoutineExerciseSet(this CreateRoutineExerciseSetRequest request, Guid routineExerciseId)
    {
        return new RoutineExerciseSet
        {
            Id = Guid.NewGuid(),
            RoutineExerciseId = routineExerciseId,
            RepRangeLow = request.RepRangeLow,
            RepRangeHigh = request.RepRangeHigh
        };
    }

    // object -> response:
    public static RoutineResponse MapToResponse(this Routine routine)
    {
        return new RoutineResponse
        {
            Id = routine.Id,
            Name = routine.Name,
            CreatedBy = routine.CreatedBy,
            ExercisesList = routine.exercises.Select(e => e.MapToResponse()).ToList()
        };
    }

    // public static RoutineExercisesResponse MapToResponse(this List<RoutineExercise> exerciseList)
    // {
    //     List<RoutineExerciseResponse> exerciseReponseList = new List<RoutineExerciseResponse>();

    //     foreach (RoutineExercise exercise in exerciseList)
    //     {
    //         exerciseReponseList.Add(exercise.MapToResponse());
    //     }

    //     return new RoutineExercisesResponse
    //     {
    //         ExecisesList = exerciseReponseList
    //     };
    // }

    public static RoutineExerciseResponse MapToResponse(this RoutineExercise exercise)
    {
        return new RoutineExerciseResponse
        {
            Id = exercise.Id,
            ExerciseId = exercise.ExerciseId,
            RoutineId = exercise.RoutineId,
            Order = exercise.Order,
            setsList = exercise.sets.Select(s => s.MapToResponse()).ToList()
        };
    }

        public static RoutineExerciseSetResponse MapToResponse(this RoutineExerciseSet set)
    {
        return new RoutineExerciseSetResponse
        {
            Id = set.Id,
            RoutineExerciseId = set.RoutineExerciseId,
            RepRangeLow = set.RepRangeLow,
            RepRangeHigh = set.RepRangeHigh
        };
    }

}
