import {
    exerciseObject,
    exerciseResponseObject,
    PaginatedData,
} from "../types/generalTypes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { saveExercise } from "../modules/apiFunctions";
import { fetchExercise, fetchExercises } from "../modules/fetchWrappers";

export function useExercises(page: number, size: number) {
    return useQuery<PaginatedData<exerciseResponseObject>>({
        queryKey: ["exercises", page, size],
        queryFn: () => fetchExercises(page, size),
    });
}

export function useExercise(exerciseId: number) {
    return useQuery<exerciseObject>({
        queryKey: ["exercises", exerciseId],
        queryFn: () => fetchExercise(exerciseId),
        enabled: exerciseId !== 0,
    });
}

export function useSaveExercise() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            endpoint,
            exercise,
        }: {
            endpoint: string;
            exercise: exerciseObject;
        }) => saveExercise(endpoint, exercise),
        onSuccess: (updated) => {
            queryClient.setQueryData(["exercises", updated.id], updated);
            queryClient.invalidateQueries({ queryKey: ["exercises"] });
        },
    });
}
