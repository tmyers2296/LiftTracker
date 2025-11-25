import { fetchData } from "./apiFunctions";
import { routineObject } from "../types/routineTypes";

export const fetchRoutines = async (
    pageNum: number,
    pageSize: number
): Promise<routineObject[]> => {
    const data = await fetchData(
        `https://localhost:5119/routines?pageNumber=${pageNum}&pageSize=${pageSize}`
    );
    return data.routines;
};

export const fetchRoutine = async (
    routineId: number
): Promise<routineObject> => {
    const data = await fetchData(
        `https://localhost:5119/routines/${routineId}`
    );
    return data;
};

export const fetchExercises = async (pageNum: number, pageSize: number) => {
    const data = await fetchData(
        `https://localhost:5119/exercises?pageNumber=${pageNum}&pageSize=${pageSize}`
    );
    return data.exercises;
};
