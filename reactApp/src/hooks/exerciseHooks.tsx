import { exerciseObject, PaginatedData } from "../types/generalTypes";
import { useQuery } from "@tanstack/react-query";
import { fetchExercises } from "../modules/fetchWrappers";

export function useExercises(page: number, size: number) {
    return useQuery<PaginatedData<exerciseObject>>({
        queryKey: ["exercises", page, size],
        queryFn: () => fetchExercises(page, size),
    });
}
