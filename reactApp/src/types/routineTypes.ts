export interface routineObject {
    id: number;
    name: string;
    createdBy: string;
    exercises: routineExerciseObject[];
}

export interface routineExerciseObject {
    id: number;
    exerciseId: number;
    routineId: number;
    exerciseName: string;
    order: number;
    sets: routineExerciseSetObject[];
}

export interface routineExerciseSetObject {
    id: number;
    repRangeLow: number;
    repRangeHigh: number;
    order: number;
}
