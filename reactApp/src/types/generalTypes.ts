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
    createdBy?: string;
    createdByUserId?: string;
    createdByUsername?: string;
    isSystemExercise?: boolean;
}

export interface exerciseResponseObject extends exerciseObject {
    createdByUserId: string;
    createdByUsername: string;
    isSystemExercise: boolean;
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
