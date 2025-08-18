import { useParams } from "react-router-dom";
import { useEffect, useState, createContext, useContext } from "react";
import AuthorizeView from "../../components/AuthorizeView.tsx";
import { fetchData } from "../../modules/fetchingFunctions.tsx";
import { routineObject } from "../../types/routineTypes.ts";
import RoutineEditCard2 from "../../components/RoutineComponents/RoutineEditCards2/RoutineEditCard2.tsx";

type routineDataGetSet = {
    routineData: routineObject | null;
    setRoutineData: React.Dispatch<React.SetStateAction<routineObject | null>>;
};

const routineDataContext = createContext<routineDataGetSet | null>(null);

function EditRoutine2() {
    const { id } = useParams();
    const [routineData, setRoutineData] = useState<routineObject | null>(null);

    useEffect(() => {
        async function fetchRoutineData(url: string) {
            try {
                // promise for when data is retrieved from API:
                let dataPromise = fetchData(url);

                // waits for data to be retrieved from API:
                const data = await dataPromise;

                // sets exerciseData:
                setRoutineData(data);

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
                value={{ routineData, setRoutineData }}
            >
                {routineData && <div>{routineData.name}</div>}
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
