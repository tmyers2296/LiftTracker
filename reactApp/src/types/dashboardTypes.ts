export interface dashboardObject {
    exercises: dashboardExerciseObject[];
}

export interface dashboardExerciseObject {
    id: number;
    exerciseId: number;
    metric: string;
    createdBy: string;
}
