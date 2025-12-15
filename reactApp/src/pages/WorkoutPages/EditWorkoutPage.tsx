import { useParams } from "react-router-dom";
import { createContext, useContext, useRef, useState, useEffect } from "react";
import AuthorizeView from "../../components/AuthorizationComponents/AuthorizeView.tsx";
import { workoutObject } from "../../types/workoutTypes.ts";
import ImprovWorkoutEditCard from "../../components/WorkoutComponents/WorkoutEditCards/ImprovCards/ImprovWorkoutEditCard.tsx";
import { useExercises } from "../../hooks/exerciseHooks.tsx";
import { useWorkout } from "../../hooks/workoutHooks.tsx";
import { workoutDataGetSet } from "../../types/contextTypes.ts";

const workoutDataContext = createContext<workoutDataGetSet | null>(null);

const newWorkoutData: workoutObject = {
    id: 0,
    date: new Date(),
    isImprovised: false,
    name: "test",
    routineId: null,
    createdBy: "test",
    exercises: [],
};

function EditWorkout() {
    const [workoutData, setWorkoutData] =
        useState<workoutObject>(newWorkoutData);
    const { data: exercises } = useExercises(1, 100);
    const tempIdCounter = useRef(-1);
    const { id } = useParams();

    const { data: existingWorkoutData } = useWorkout(id ? Number(id) : 0);

    useEffect(() => {
        if (existingWorkoutData) setWorkoutData(existingWorkoutData);
    }, [existingWorkoutData]);

    return (
        <AuthorizeView>
            <workoutDataContext.Provider
                value={{
                    tempIdCounter,
                    workoutData,
                    setWorkoutData,
                    allExercises: exercises ?? [],
                }}
            >
                <ImprovWorkoutEditCard contextHookCallback={useWorkoutData} />
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

export default EditWorkout;
