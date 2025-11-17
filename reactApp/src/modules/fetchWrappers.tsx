import { fetchData } from "./apiFunctions";

export const fetchRoutines = async (pageNum: number, pageSize: number) => {
    const data = await fetchData(
        `https://localhost:5119/routines?pageNumber=${pageNum}&pageSize=${pageSize}`
    );
    return data.routines;
};

export const fetchExercises = async (pageNum: number, pageSize: number) => {
    const data = await fetchData(
        `https://localhost:5119/routines?pageNumber=${pageNum}&pageSize=${pageSize}`
    );
    return data.exercises;
};
