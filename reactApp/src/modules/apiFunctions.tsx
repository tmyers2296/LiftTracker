import { routineObject } from "../types/routineTypes";
// // const API_BASE = "https://localhost:5119";

// fetch data from api & return it:
export async function fetchData(url: string) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Could not access resource");
    }

    return response.json();
}

// // saving data to API:
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
    nestedObject: T
): Promise<T> {
    const payload = buildPayload(nestedObject);

    const response = await fetch(
        nestedObject.id === 0 ? endpoint.replace(/\/[^/]*$/, "") : endpoint,
        {
            method: nestedObject.id === 0 ? "POST" : "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        }
    );

    if (!response.ok) throw new Error("Failed to save entity");

    return response.json();
}
