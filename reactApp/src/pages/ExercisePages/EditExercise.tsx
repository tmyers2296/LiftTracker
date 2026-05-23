import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthorizeView from "../../components/AuthorizationComponents/AuthorizeView";
import ExerciseEditCard from "../../components/ExerciseComponents/ExerciseEditCard/ExerciseEditCard";
import { useExercise } from "../../hooks/exerciseHooks";
import { exerciseObject } from "../../types/generalTypes";

type exerciseDataGetSet = {
    exerciseData: exerciseObject | null;
    setExerciseData: React.Dispatch<
        React.SetStateAction<exerciseObject | null>
    >;
};

const newExerciseData: exerciseObject = {
    id: 0,
    name: "New Exercise",
    createdBy: "",
};

const exerciseDataContext = createContext<exerciseDataGetSet | null>(null);

function EditExercise() {
    const [exerciseData, setExerciseData] = useState<exerciseObject | null>(
        null,
    );
    const { id } = useParams();
    const exerciseId = id ? Number(id) : 0;
    const isEditMode = exerciseId !== 0;
    const { data: existingExerciseData } = useExercise(exerciseId);

    useEffect(() => {
        if (isEditMode && existingExerciseData) {
            setExerciseData(existingExerciseData);
        }

        if (!isEditMode) {
            setExerciseData(newExerciseData);
        }
    }, [existingExerciseData, isEditMode]);

    return (
        <AuthorizeView>
            <exerciseDataContext.Provider
                value={{ exerciseData, setExerciseData }}
            >
                <ExerciseEditCard />
            </exerciseDataContext.Provider>
        </AuthorizeView>
    );
}

export function useExerciseData(): exerciseDataGetSet {
    const context = useContext(exerciseDataContext);
    if (!context) {
        throw new Error(
            "useExerciseData must be used within an ExerciseDataProvider",
        );
    }
    return context;
}

export default EditExercise;
