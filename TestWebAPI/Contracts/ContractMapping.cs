public static class ContractMapping
{
    // * exercise mapping methods *
    // request -> object:
    public static Exercise MapToExercise(this CreateExerciseRequest request)
    {
        return new Exercise
        {
            Name = request.Name,
            CreatedBy = request.CreatedBy
        };
    }

    public static Exercise MapToExercise(this UpdateExerciseRequest request, int id)
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
            Name = request.Name,
            CreatedBy = request.CreatedBy
        };
    }

    public static RoutineExercise MapToRoutineExercise(this CreateRoutineExerciseRequest request)
    {
        return new RoutineExercise
        {
            ExerciseId = request.ExerciseId,
            RoutineId = request.RoutineId,
            Order = request.Order
        };
    }

    public static RoutineExerciseSet MapToRoutineExerciseSet(this CreateRoutineExerciseSetRequest request)
    {
        return new RoutineExerciseSet
        {
            RoutineExerciseId = request.RoutineExerciseId,
            RepRangeLow = request.RepRangeLow,
            RepRangeHigh = request.RepRangeHigh
        };
    }

    public static Routine MapToRoutine(this UpdateRoutineRequest request, int id)
    {
        return new Routine
        {
            Id = id,
            Name = request.Name,
            CreatedBy = request.CreatedBy
        };
    }

    public static RoutineExercise MapToRoutineExercise(this UpdateRoutineExerciseRequest request, int id)
    {
        return new RoutineExercise
        {
            Id = id,
            ExerciseId = request.ExerciseId,
            RoutineId = request.RoutineId,
            Order = request.Order
        };
    }

    public static RoutineExerciseSet MapToRoutineExerciseSet(this UpdateRoutineExerciseSetRequest request, int id)
    {
        return new RoutineExerciseSet
        {
            Id = id,
            RoutineExerciseId = request.RoutineExerciseId,
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
            ExercisesList = routine.Exercises.Select(e => e.MapToResponse()).ToList()
        };
    }

        public static RoutinePaginatedResponse MapToResponse(this List<Routine> routineList)
    {
        List<RoutineResponse> routineResponses = new List<RoutineResponse>();

        foreach (Routine routine in routineList)
        {
            routineResponses.Add(routine.MapToResponse());
        }

        return new RoutinePaginatedResponse
        {
            Routines = routineResponses
        };
    }

    public static RoutineExerciseResponse MapToResponse(this RoutineExercise resultExercise)
    {
        return new RoutineExerciseResponse
        {
            Id = resultExercise.Id,
            ExerciseId = resultExercise.ExerciseId,
            RoutineId = resultExercise.RoutineId,
            ExerciseName = resultExercise.Exercise?.Name ?? "no exercise",
            Order = resultExercise.Order,
            setsList = resultExercise.Sets.Select(s => s.MapToResponse()).ToList()
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
