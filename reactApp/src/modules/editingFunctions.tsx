import {
    routineExerciseObject,
    routineExerciseSetObject,
} from "../types/routineTypes.ts";

// **Shifting functions**
// moves the revelant item up or down in it's list for
// instance an exercise in a routine or a set in an exercise
export function swapOrder<
    T extends routineExerciseObject | routineExerciseSetObject
>(objectList: T[], targetId: number, direction: "up" | "down"): T[] {
    const item = objectList.find((i) => i.id === targetId);
    if (!item) return objectList;

    const newOrder = direction === "up" ? item.order + 1 : item.order - 1;
    const adjacent = objectList.find((i) => i.order === newOrder);
    if (!adjacent) return objectList;

    return objectList.map((object) => {
        if (object.id === targetId) return { ...object, order: newOrder };
        if (object.id === adjacent.id) return { ...object, order: item.order };
        return object;
    });
}

// **CRUD functions**
export function updateItem<
    T extends routineExerciseObject | routineExerciseSetObject
>(objectList: T[], updatedObject: T): T[] {
    return objectList.map((object) => {
        if (object.id !== updatedObject.id) return object;
        return updatedObject;
    });
}

// export function addItem(exercise: routineExerciseObject) {
//     if (exercise) {
//         const newExercise: routineExerciseObject = exerciseData;

//         const newSet: routineExerciseSetObject = {
//             id: createTempId(tempIdCounter),
//             repRangeLow: 6,
//             repRangeHigh: 8,
//             order: exercise.sets.length,
//         };

//         newExercise.sets = [...exercise.sets, newSet];
//         newExercise.sets;

//         updateExercise(exerciseData.id, newExercise);
//     }
// }

// export function removeItem(exerciseId: number) {
//     if (!routineData) return;

//     const exerciseToDelete = routineData.exercises.find(
//         (exercise) => exercise.id === exerciseId
//     );

//     if (!exerciseToDelete) return;

//     const newExercises = routineData.exercises
//         .filter((exercise) => exercise.id !== exerciseId)
//         .map((exercise) =>
//             exercise.order > exerciseToDelete.order
//                 ? { ...exercise, order: exercise.order - 1 }
//                 : exercise
//         );

//     setRoutineData({ ...routineData, exercises: newExercises });
// }

// **Create temp ids functions
export function createTempId(idCounter: React.MutableRefObject<number>) {
    return idCounter.current--; // e.g. -1, -2, -3...
}
