export interface routineObject {
    id: number;
    name: string;
    createdBy: string;
    exercises: [];
}

export interface routineExerciseObject {
    id: number;
    exerciseId: number;
    routineId: number;
    exerciseName: string;
    order: number;
    sets: [];
}

export interface routineExerciseSetObject {
    id: number;
    routineExerciseId: number;
    repRangeLow: number;
    repRangeHigh: number;
}
