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

// **Create temp ids functions
export function createTempId(idCounter: React.MutableRefObject<number>) {
    return idCounter.current--; // e.g. -1, -2, -3...
}
