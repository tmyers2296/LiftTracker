import { fetchData } from "./apiFunctions";
import { routineObject } from "../types/routineTypes";
import { workoutObject } from "../types/workoutTypes";
import {
    exerciseObject,
    exerciseResponseObject,
    PaginatedData,
} from "../types/generalTypes";

export const fetchRoutines = async (
    pageNum: number,
    pageSize: number,
): Promise<PaginatedData<routineObject>> => {
    const data = await fetchData(
        `https://localhost:5119/routines?pageNumber=${pageNum}&pageSize=${pageSize}`,
    );

    return data;
};

export const fetchRoutine = async (
    routineId: number,
): Promise<routineObject> => {
    const data = await fetchData(
        `https://localhost:5119/routines/${routineId}`,
    );
    return data;
};

export const fetchExercises = async (
    pageNum: number,
    pageSize: number,
): Promise<PaginatedData<exerciseResponseObject>> => {
    const data = await fetchData(
        `https://localhost:5119/exercises?pageNumber=${pageNum}&pageSize=${pageSize}`,
    );

    return {
        items: data.exercises,
        hasMore: data.exercises.length === pageSize,
    };
};

export const fetchExercise = async (
    exerciseId: number,
): Promise<exerciseObject> => {
    const data = await fetchData(
        `https://localhost:5119/exercises/${exerciseId}`,
    );
    return data;
};

export const fetchWorkouts = async (
    pageNum: number,
    pageSize: number,
): Promise<PaginatedData<workoutObject>> => {
    const data = await fetchData(
        `https://localhost:5119/workouts?pageNumber=${pageNum}&pageSize=${pageSize}`,
    );

    return {
        items: data.items.map((workout: workoutObject) => ({
            ...workout,
            date: new Date(workout.date),
        })),
        hasMore: data.hasMore,
    };
};

export const fetchWorkout = async (
    workoutId: number,
): Promise<workoutObject> => {
    const data = await fetchData(
        `https://localhost:5119/workouts/${workoutId}`,
    );
    return data;
};
