export interface dashboardObject {
    id: number;
    exercises: dashboardExerciseObject[];
}

export interface dashboardExerciseObject {
    id: number;
    exerciseId: number;
    metric: string;
    order: number;
    createdBy: string;
}
