import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AuthorizeView from "../../components/AuthorizeView.tsx";
import { fetchData } from "../../modules/fetchingFunctions.tsx";
import { routineObject } from "../../types/routineTypes.ts";

function EditRoutine() {
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
            <div>poop - {id}</div>
            {routineData && (
                <div>{`id: ${routineData.id}, name: ${routineData.name}, createdBy: ${routineData.createdBy}`}</div>
            )}
        </AuthorizeView>
    );
}

export default EditRoutine;
