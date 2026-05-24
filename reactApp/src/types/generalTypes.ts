import {
    routineExerciseObject,
    routineExerciseSetObject,
} from "./routineTypes";
import {
    workoutExerciseObject,
    workoutExerciseSetObject,
} from "./workoutTypes";

export interface exerciseObject {
    id: number;
    name: string;
    createdBy: string;
}

export interface exerciseResponseObject {
    id: number;
    name: string;
    createdByUserId: string;
    createdByUsername: string;
}

export type OrderedItem =
    | routineExerciseObject
    | routineExerciseSetObject
    | workoutExerciseObject
    | workoutExerciseSetObject;

export type PaginatedData<T> = {
    items: T[];
    hasMore: boolean;
};
