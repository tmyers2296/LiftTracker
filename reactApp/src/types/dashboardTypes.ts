export interface dashboardObject {
    id: number;
    exercises: dashboardExerciseObject[];
    createdBy: string;
}

export interface dashboardExerciseObject {
    id: number;
    dashboardId: number;
    exerciseId: number;
    metric: string;
    order: number;
}
