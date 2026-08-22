import { dashboardObject } from "../../types/dashboardTypes";
import { exerciseObject } from "../../types/generalTypes";
import { createContext, useState, useRef } from "react";
import { useExercises } from "../../hooks/exerciseHooks";
import AuthorizeView from "../../components/AuthorizationComponents/AuthorizeView";

type dashboardDataGetSet = {
    dashboardData: dashboardObject | null;
    setDashboardData: React.Dispatch<
        React.SetStateAction<dashboardObject | null>
    >;
    allExercises: exerciseObject[];
    tempIdCounter: React.MutableRefObject<number>;
};

const dashboardDataContext = createContext<dashboardDataGetSet | null>(null);

function EditDashboard() {
    const [dashboardData, setDashboardData] = useState<dashboardObject | null>(
        null,
    );
    const { data: exercises } = useExercises(1, 100);
    const tempIdCounter = useRef(-1);

    return (
        <AuthorizeView>
            <dashboardDataContext.Provider
                value={{
                    dashboardData,
                    setDashboardData,
                    allExercises: exercises?.items ?? [],
                    tempIdCounter,
                }}
            ></dashboardDataContext.Provider>
        </AuthorizeView>
    );
}

export default EditDashboard;
