import { useParams } from "react-router-dom";
import { useEffect, useState, createContext, useContext, useRef } from "react";
import AuthorizeView from "../../components/AuthorizeView.tsx";
import { fetchData } from "../../modules/fetchingFunctions.tsx";
import { routineObject } from "../../types/routineTypes.ts";
import { exerciseObject } from "../../types/generalTypes.ts";
import RoutineEditCard2 from "../../components/RoutineComponents/RoutineEditCards2/RoutineEditCard2.tsx";

type routineDataGetSet = {
    routineData: routineObject | null;
    setRoutineData: React.Dispatch<React.SetStateAction<routineObject | null>>;
    allExercises: exerciseObject[];
    tempIdCounter: React.MutableRefObject<number>;
};

const routineDataContext = createContext<routineDataGetSet | null>(null);

function EditRoutine2() {
    const { id } = useParams();
    const [routineData, setRoutineData] = useState<routineObject | null>(null);
    const [allExercises, setAllExercises] = useState<exerciseObject[]>([]);
    const tempIdCounter = useRef(-1);

    useEffect(() => {
        async function fetchRoutineData(url: string) {
            try {
                // promise for when data is retrieved from API:
                let dataPromise = fetchData(url);
                let exercisesPromise = fetchData(
                    `https://localhost:5119/exercises?pageNumber=1&pageSize=100`
                );

                // waits for data to be retrieved from API:
                const data = await dataPromise;
                const exercises = await exercisesPromise;

                // sets exerciseData:
                setRoutineData(data);
                setAllExercises(exercises.exercises);

                // catch & show any errors:
            } catch (err) {
                console.error(err);
            }
        }

        fetchRoutineData(`https://localhost:5119/routines/${id}`);
    }, []);

    return (
        <AuthorizeView>
            <routineDataContext.Provider
                value={{
                    routineData,
                    setRoutineData,
                    allExercises,
                    tempIdCounter,
                }}
            >
                <RoutineEditCard2 />
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

export default EditRoutine2;
