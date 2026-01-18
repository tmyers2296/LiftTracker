import { useParams } from "react-router-dom";
import { useEffect, useState, createContext, useContext, useRef } from "react";
import AuthorizeView from "../../components/AuthorizationComponents/AuthorizeView.tsx";
import { routineObject } from "../../types/routineTypes.ts";
import { exerciseObject } from "../../types/generalTypes.ts";
import RoutineEditCard from "../../components/RoutineComponents/RoutineEditCards/RoutineEditCard.tsx";
import { useExercises } from "../../hooks/exerciseHooks.tsx";
import { useRoutine } from "../../hooks/routineHooks.tsx";

type routineDataGetSet = {
    routineData: routineObject | null;
    setRoutineData: React.Dispatch<React.SetStateAction<routineObject | null>>;
    allExercises: exerciseObject[];
    tempIdCounter: React.MutableRefObject<number>;
};

const newRoutineData: routineObject = {
    id: 0,
    name: "test",
    createdBy: "test",
    exercises: [],
};

const routineDataContext = createContext<routineDataGetSet | null>(null);

function EditRoutine() {
    const [routineData, setRoutineData] = useState<routineObject | null>(null);

    const tempIdCounter = useRef(-1);
    const { id } = useParams();
    const isEditMode = Number(id) !== 0;

    const { data: exercises } = useExercises(1, 100);
    const { data: existingRoutineData } = useRoutine(id ? Number(id) : 0);

    useEffect(() => {
        if (isEditMode && existingRoutineData)
            setRoutineData(existingRoutineData);

        if (!isEditMode) setRoutineData(newRoutineData);
    }, [existingRoutineData]);

    return (
        <AuthorizeView>
            <routineDataContext.Provider
                value={{
                    routineData,
                    setRoutineData,
                    allExercises: exercises ?? [],
                    tempIdCounter,
                }}
            >
                <RoutineEditCard />
            </routineDataContext.Provider>
        </AuthorizeView>
    );
}

export function useRoutineData(): routineDataGetSet {
    const context = useContext(routineDataContext);
    if (!context) {
        throw new Error("useCounter must be used within a CounterProvider");
    }
    return context;
}

export default EditRoutine;
