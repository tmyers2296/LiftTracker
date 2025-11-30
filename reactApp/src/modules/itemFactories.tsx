import {
    routineExerciseObject,
    routineExerciseSetObject,
} from "../types/routineTypes";
import {
    workoutExerciseObject,
    workoutExerciseSetObject,
} from "../types/workoutTypes";
import { createTempId } from "./editingFunctions";

// routines:
export function createNewExercise(
    routineId: number,
    allExercises: { id: number; name: string }[],
    tempIdCounter: React.MutableRefObject<number>,
    currentExercisesLength: number
): routineExerciseObject {
    const firstExercise = allExercises[0];

    return {
        id: createTempId(tempIdCounter),
        exerciseId: firstExercise.id,
        routineId: routineId,
        exerciseName: firstExercise.name,
        order: currentExercisesLength,
        sets: [],
    };
}

export function createNewSet(
    tempIdCounter: React.MutableRefObject<number>,
    currentSetsLength: number
): routineExerciseSetObject {
    return {
        id: createTempId(tempIdCounter),
        repRangeLow: 6,
        repRangeHigh: 8,
        order: currentSetsLength,
    };
}

// workouts:
export function createNewWorkoutExercise(
    workoutId: number,
    exerciseId: number,
    tempIdCounter: React.MutableRefObject<number>,
    currentExercisesLength: number
): workoutExerciseObject {
    return {
        id: createTempId(tempIdCounter),
        exerciseId: exerciseId,
        workoutId: workoutId,
        order: currentExercisesLength,
        sets: [],
    };
}

export function createNewWorkoutExerciseSet(
    tempIdCounter: React.MutableRefObject<number>,
    currentSetsLength: number
): workoutExerciseSetObject {
    return {
        id: createTempId(tempIdCounter),
        weight: 0,
        reps: 0,
        order: currentSetsLength,
    };
}
