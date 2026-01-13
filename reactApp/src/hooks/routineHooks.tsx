import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { saveNestedObject } from "../modules/apiFunctions";
import { routineObject } from "../types/routineTypes";
import { fetchRoutines, fetchRoutine } from "../modules/fetchWrappers";
import { PaginatedData } from "../types/generalTypes";

export function useSaveRoutine() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            endpoint,
            routine,
        }: {
            endpoint: string;
            routine: routineObject;
        }) => saveNestedObject(endpoint, routine),

        onSuccess: (updated) => {
            // update single routine cache
            queryClient.setQueryData(["routine", updated.id], updated);

            // refresh list
            queryClient.invalidateQueries({ queryKey: ["routines"] });
        },
    });
}

export function useDeleteRoutine() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) =>
            fetch(`https://localhost:5119/routines/${id}`, {
                method: "DELETE",
            }),
        onSuccess: () => {
            // invalidate the 'routines' cache to refetch updated list
            queryClient.invalidateQueries({ queryKey: ["routines"] });
        },
    });
}

export function useRoutines(page: number, size: number) {
    return useQuery<PaginatedData<routineObject>>({
        queryKey: ["routines", page, size],
        queryFn: () => fetchRoutines(page, size),
    });
}

export function useRoutine(routineId: number) {
    return useQuery<routineObject>({
        queryKey: ["routines", routineId],
        queryFn: () => fetchRoutine(routineId),
        enabled: routineId !== 0,
    });
}
