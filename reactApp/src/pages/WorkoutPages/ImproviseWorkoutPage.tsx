import { useParams } from "react-router-dom";
import { createContext, useContext, useRef, useState } from "react";
import AuthorizeView from "../../components/AuthorizationComponents/AuthorizeView.tsx";
import { workoutObject } from "../../types/workoutTypes.ts";
import ImprovWorkoutEditCard from "../../components/WorkoutComponents/WorkoutEditCards/ImprovCards/ImprovWorkoutEditCard.tsx";
import { exerciseObject } from "../../types/generalTypes.ts";
import { useExercises } from "../../hooks/exerciseHooks.tsx";

type workoutDataGetSet = {
    workoutData: workoutObject;
    setWorkoutData: React.Dispatch<React.SetStateAction<workoutObject>>;
    tempIdCounter: React.MutableRefObject<number>;
    allExercises: exerciseObject[];
};

const workoutDataContext = createContext<workoutDataGetSet | null>(null);

function ImproviseWorkout() {
    const { data: exercises } = useExercises(1, 100);
    const tempIdCounter = useRef(-1);
    const { id } = useParams();

    const newWorkoutData: workoutObject = {
        id: 0,
        date: new Date(),
        isImprovised: false,
        name: "Improvised Routine",
        routineId: Number(id),
        createdBy: "test",
        exercises: [],
    };

    const [workoutData, setWorkoutData] =
        useState<workoutObject>(newWorkoutData);

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
                <ImprovWorkoutEditCard />
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

export default ImproviseWorkout;
