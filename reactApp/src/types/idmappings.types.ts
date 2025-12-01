export type IdMappingsState = {
    exerciseMap: { [routineExerciseId: number]: number };
    setMap: { [routineSetId: number]: number };
};

export type IdMappingsAction =
    | {
          type: "MAP_EXERCISE";
          routineExerciseId: number;
          workoutExerciseId: number;
      }
    | {
          type: "MAP_SET";
          routineSetId: number;
          workoutSetId: number;
      }
    | { type: "RESET_ALL" };
