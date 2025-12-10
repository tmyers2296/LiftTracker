import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { workoutObject } from "../types/workoutTypes";
import { fetchWorkouts } from "../modules/fetchWrappers";
import { saveNestedObject } from "../modules/apiFunctions";

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
    return useQuery<workoutObject[]>({
        queryKey: ["workouts", page, size],
        queryFn: () => fetchWorkouts(page, size),
    });
}
