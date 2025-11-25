import { useParams } from "react-router-dom";
import { createContext, useContext, useRef } from "react";
import AuthorizeView from "../../components/AuthorizationComponents/AuthorizeView.tsx";
import { routineObject } from "../../types/routineTypes.ts";
import WorkoutEditCard from "../../components/WorkoutComponents/WorkoutEditCard.tsx";
import { useRoutine } from "../../hooks/routineHooks.tsx";
import { exerciseObject } from "../../types/generalTypes.ts";
import { useExercises } from "../../hooks/exerciseHooks.tsx";

type workoutDataGetSet = {
    routineData: routineObject | null;
    tempIdCounter: React.MutableRefObject<number>;
    allExercises: exerciseObject[];
};

const workoutDataContext = createContext<workoutDataGetSet | null>(null);

function RecordRoutineWorkout() {
    const { data: exercises } = useExercises(1, 100);
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
                    allExercises: exercises ?? [],
                }}
            >
                <WorkoutEditCard />
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

export default RecordRoutineWorkout;
