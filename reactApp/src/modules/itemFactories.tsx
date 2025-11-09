import {
    routineExerciseObject,
    routineExerciseSetObject,
} from "../types/routineTypes";

import { createTempId } from "./editingFunctions";

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
