import { useParams } from "react-router-dom";
import { useEffect, useState, createContext } from "react";
import AuthorizeView from "../../components/AuthorizeView.tsx";
import { fetchData } from "../../modules/fetchingFunctions.tsx";
import { routineObject } from "../../types/routineTypes.ts";
import RoutineEditCard from "../../components/RoutineComponents/RoutineEditCards/RoutineEditCard.tsx";

type routineDataGetSet = {
    routineData: routineObject | null;
    setRoutineData: React.Dispatch<React.SetStateAction<routineObject | null>>;
};

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

    const routineDataContext = createContext<routineDataGetSet | null>(null);

    return (
        <AuthorizeView>
            <routineDataContext.Provider
                value={{ routineData, setRoutineData }}
            ></routineDataContext.Provider>
        </AuthorizeView>
    );
}

export default EditRoutine2;
