import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveNestedObject } from "../modules/apiFunctions";
import { routineObject } from "../types/routineTypes";

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
