import { useParams } from "react-router-dom";
import { createContext, useContext, useRef, useState, useReducer } from "react";
import AuthorizeView from "../../components/AuthorizationComponents/AuthorizeView.tsx";
import { routineObject } from "../../types/routineTypes.ts";
import { workoutObject } from "../../types/workoutTypes.ts";
import WorkoutEditCard from "../../components/WorkoutComponents/WorkoutEditCard.tsx";
import { useRoutine } from "../../hooks/routineHooks.tsx";
import { exerciseObject } from "../../types/generalTypes.ts";
import { useExercises } from "../../hooks/exerciseHooks.tsx";
import {
    idMappingsReducer,
    initialIdMappings,
} from "../../reducers/idmappings.reducer.ts";
import {
    IdMappingsAction,
    IdMappingsState,
} from "../../types/idmappings.types.ts";

type workoutDataGetSet = {
    idMappings: IdMappingsState;
    dispatchIdMappings: React.Dispatch<IdMappingsAction>;
    recordedIDList: {
        [key: number]: number;
    };
    setRecordedIDList: React.Dispatch<
        React.SetStateAction<{
            [key: number]: number;
        }>
    >;
    routineData: routineObject | null;
    workoutData: workoutObject;
    setWorkoutData: React.Dispatch<React.SetStateAction<workoutObject>>;
    tempIdCounter: React.MutableRefObject<number>;
    allExercises: exerciseObject[];
};

const workoutDataContext = createContext<workoutDataGetSet | null>(null);

function RecordRoutineWorkout() {
    const { data: exercises } = useExercises(1, 100);
    const tempIdCounter = useRef(-1);
    const { id } = useParams();
    const { data: existingRoutineData } = useRoutine(id ? Number(id) : 0);

    const newWorkoutData: workoutObject = {
        id: 0,
        isImprovised: false,
        name: "test",
        routineId: Number(id),
        createdBy: "test",
        exercises: [],
    };

    const [workoutData, setWorkoutData] =
        useState<workoutObject>(newWorkoutData);

    const [recordedIDList, setRecordedIDList] = useState<{
        [key: number]: number;
    }>({});

    const [idMappings, dispatchIdMappings] = useReducer(
        idMappingsReducer,
        initialIdMappings
    );

    return (
        <AuthorizeView>
            <workoutDataContext.Provider
                value={{
                    idMappings: idMappings,
                    dispatchIdMappings: dispatchIdMappings,
                    recordedIDList: recordedIDList,
                    setRecordedIDList: setRecordedIDList,
                    routineData: existingRoutineData
                        ? existingRoutineData
                        : null,
                    tempIdCounter,
                    workoutData,
                    setWorkoutData,
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
