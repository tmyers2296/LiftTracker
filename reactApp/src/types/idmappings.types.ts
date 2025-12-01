export type IdMappingsState = {
    exerciseMap: { [workoutExerciseId: number]: number };
    setMap: { [workoutSetId: number]: number };
};

export type IdMappingsAction =
    | {
          type: "MAP_EXERCISE";
          routineExerciseId: number;
          workoutExerciseId: number;
      }
    | { type: "DELETE_EXERCISE_MAPPING"; workoutExerciseId: number }
    | {
          type: "MAP_SET";
          routineSetId: number;
          workoutSetId: number;
      }
    | { type: "DELETE_SET_MAPPING"; workoutExerciseId: number }
    | { type: "RESET_ALL" };
