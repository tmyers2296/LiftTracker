import { useEffect, useState } from "react";
import { fetchData } from "../modules/apiFunctions";

interface ExerciseCardProps {
    id: string;
}

interface ExerciseDataObject {
    id: number;
    name: string;
    createdBy: string;
}

function ExerciseCard({ id }: ExerciseCardProps) {
    const [exerciseData, setExerciseData] = useState<ExerciseDataObject>({
        id: 0,
        name: "",
        createdBy: "",
    });

    const url = `https://localhost:5119/exercises/${id}`;

    useEffect(() => {
        async function fetchExerciseData(url: string) {
            try {
                // promise for when data is retrieved from API:
                let dataPromise = fetchData(url);

                // waits for data to be retrieved from API:
                const data = await dataPromise;

                // sets exerciseData:
                setExerciseData(data);

                // catch & show any errors:
            } catch (err) {
                console.error(err);
            }
        }

        fetchExerciseData(url);
    }, [id]);

    let result = "couldn't find exercise..";

    if (exerciseData) {
        result = exerciseData.name;
    }

    return <div>{result}</div>;
}

export default ExerciseCard;
