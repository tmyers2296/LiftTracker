import { workoutObject } from "./workoutTypes";
import { exerciseObject } from "./generalTypes";

export type workoutDataGetSet = {
    workoutData: workoutObject;
    setWorkoutData: React.Dispatch<React.SetStateAction<workoutObject>>;
    tempIdCounter: React.MutableRefObject<number>;
    allExercises: exerciseObject[];
};
