import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { workoutObject } from "../types/workoutTypes";
import { fetchWorkout, fetchWorkouts } from "../modules/fetchWrappers";
import { saveNestedObject } from "../modules/apiFunctions";
import { PaginatedData } from "../types/generalTypes";

export function useSaveWorkout() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            endpoint,
            workout,
        }: {
            endpoint: string;
            workout: workoutObject;
        }) => saveNestedObject(endpoint, workout),

        onSuccess: (updated) => {
            // update single routine cache
            queryClient.setQueryData(["workout", updated.id], updated);

            // refresh list
            queryClient.invalidateQueries({ queryKey: ["workouts"] });
        },
    });
}

export function useWorkouts(page: number, size: number) {
    return useQuery<PaginatedData<workoutObject>>({
        queryKey: ["workouts", page, size],
        queryFn: () => fetchWorkouts(page, size),
    });
}

export function useWorkout(workoutId: number) {
    return useQuery<workoutObject>({
        queryKey: ["workouts", workoutId],
        queryFn: () => fetchWorkout(workoutId),
        enabled: workoutId !== 0,
    });
}

export function useDeleteWorkout() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) =>
            fetch(`https://localhost:5119/workouts/${id}`, {
                method: "DELETE",
            }),
        onSuccess: () => {
            // invalidate the 'routines' cache to refetch updated list
            queryClient.invalidateQueries({ queryKey: ["workouts"] });
        },
    });
}
