import {
    routineExerciseObject,
    routineExerciseSetObject,
} from "./routineTypes";
import { workoutExerciseObject } from "./workoutTypes";

export interface exerciseObject {
    id: number;
    name: string;
    createdBy: string;
}

export type OrderedItem =
    | routineExerciseObject
    | routineExerciseSetObject
    | workoutExerciseObject;
