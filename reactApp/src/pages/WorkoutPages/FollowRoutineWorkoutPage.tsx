import { useParams } from "react-router-dom";
import { createContext, useContext, useRef } from "react";
import AuthorizeView from "../../components/AuthorizationComponents/AuthorizeView.tsx";
import { routineObject } from "../../types/routineTypes.ts";
import RoutineEditCard2 from "../../components/RoutineComponents/RoutineEditCards/RoutineEditCard.tsx";
import { useRoutine } from "../../hooks/routineHooks.tsx";

type workoutDataGetSet = {
    routineData: routineObject | null;
    tempIdCounter: React.MutableRefObject<number>;
};

const workoutDataContext = createContext<workoutDataGetSet | null>(null);

function EditRoutine() {
    const tempIdCounter = useRef(-1);
    const { id } = useParams();
    const { data: existingRoutineData } = useRoutine(id ? Number(id) : 0);

    return (
        <AuthorizeView>
            <workoutDataContext.Provider
                value={{
                    routineData: existingRoutineData
                        ? existingRoutineData
                        : null,
                    tempIdCounter,
                }}
            >
                <RoutineEditCard2 />
            </workoutDataContext.Provider>
        </AuthorizeView>
    );
}

export function useWorkoutData(): workoutDataGetSet {
    const context = useContext(workoutDataContext);
    if (!context) {
        throw new Error("useCounter must be used within a CounterProvider");
    }
    return context;
}

export default EditRoutine;
