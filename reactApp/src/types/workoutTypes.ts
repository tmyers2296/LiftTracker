export interface workoutObject {
    id: number;
    isImprovised: boolean;
    name: string;
    routineId: number | null;
    createdBy: string;
    exercises: workoutExerciseObject[];
}

export interface workoutExerciseObject {
    id: number;
    exerciseId: number;
    workoutId: number;
    order: number;
    sets: workoutExerciseSetObject[];
}

export interface workoutExerciseSetObject {
    id: number;
    weight: number;
    reps: number;
    order: number;
}
