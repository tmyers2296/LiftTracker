export interface dashboardObject {
    id: number;
    exercises: dashboardExerciseObject[];
    createdByUserId: string;
}

export interface dashboardExerciseObject {
    id: number;
    dashboardId: number;
    exerciseName: string;
    exerciseId: number;
    metric: string;
    order: number;
}
