import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { dashboardObject } from "../types/dashboardTypes";
import {
    fetchDashboardById,
    fetchDashboardByUser,
} from "../modules/fetchWrappers";

export function useDashboardByUser() {
    return useQuery<dashboardObject>({
        queryKey: [],
        queryFn: () => fetchDashboardByUser(),
    });
}

export function useDashboardById(dashboardId: number) {
    return useQuery<dashboardObject>({
        queryKey: ["dashboards", dashboardId],
        queryFn: () => fetchDashboardById(dashboardId),
        enabled: dashboardId !== 0,
    });
}
