import { routineObject } from "../types/routineTypes";

function buildPayload<T extends routineObject>(nestedObject: T): T {
    return {
        ...nestedObject,
        exercises: nestedObject.exercises.map((exercise) => ({
            ...exercise,
            id: exercise.id < 0 ? 0 : exercise.id,
            sets: exercise.sets.map((set) => ({
                ...set,
                id: set.id < 0 ? 0 : set.id,
            })),
        })),
    };
}

export async function saveNestedObject<T extends routineObject>(
    endpoint: string,
    nestedObject: T,
    setEntityData: (data: T) => void
) {
    const payload = buildPayload(nestedObject);

    const response = await fetch(endpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error("Failed to save entity");

    const updatedEntity = await response.json();
    setEntityData(updatedEntity);
}
