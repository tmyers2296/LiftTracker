import { OrderedItem } from "../types/generalTypes.ts";

// **Shifting functions**
// moves the revelant item up or down in it's list for
// instance an exercise in a routine or a set in an exercise
export function swapOrder<T extends OrderedItem>(
    objectList: T[],
    targetId: number,
    direction: "up" | "down"
): T[] {
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
export function updateItem<T extends OrderedItem>(
    objectList: T[],
    updatedObject: T
): T[] {
    return objectList.map((object) => {
        if (object.id !== updatedObject.id) return object;
        return updatedObject;
    });
}

export function addItem<T extends OrderedItem>(list: T[], newItem: T): T[] {
    return [...list, newItem];
}

export function removeItem<T extends OrderedItem>(
    list: T[],
    targetId: number
): T[] {
    const target = list.find((i) => i.id === targetId);
    if (!target) return list;

    return list
        .filter((i) => i.id !== targetId)
        .map((i) =>
            i.order > target.order ? { ...i, order: i.order - 1 } : i
        );
}

// **Create temp ids functions
export function createTempId(idCounter: React.MutableRefObject<number>) {
    return idCounter.current--; // e.g. -1, -2, -3...
}
