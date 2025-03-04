export interface routineObject {
  id: number;
  name: string;
  createdBy: string;
  exercisesList: [];
}

export interface routineExerciseObject {
  id: number;
  exerciseId: number;
  routineId: number;
  exerciseName: string;
  order: number;
}

export interface routineExerciseSetObject {
  id: number;
  routineExerciseId: number;
  repRangeLow: number;
  repRangeHigh: number;
}
