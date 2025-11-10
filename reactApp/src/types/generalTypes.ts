import {
    routineExerciseObject,
    routineExerciseSetObject,
} from "./routineTypes";

export interface exerciseObject {
    id: number;
    name: string;
    createdBy: string;
}

export type OrderedItem = routineExerciseObject | routineExerciseSetObject;
