import { useRoutineData } from "../../../pages/RoutinePages/EditRoutine.tsx";
import RoutineExerciseEditCard from "./RoutineExerciseEditCard.tsx";
import {
    routineExerciseObject,
    routineObject,
} from "../../../types/routineTypes.ts";
import styles from "./RoutineEditCard.module.css";
import { createNewExercise } from "../../../modules/itemFactories.tsx";
import { addItem } from "../../../modules/editingFunctions.tsx";
import { useSaveRoutine } from "../../../hooks/routineHooks.tsx";
import { useNavigate } from "react-router-dom";

// import { saveNestedObject } from "../../../modules/savingFunctions.tsx";

function RoutineEditCard() {
    const navigate = useNavigate();

    //Hooks:
    const { routineData, setRoutineData, allExercises, tempIdCounter } =
        useRoutineData();

    const saveRoutineMutation = useSaveRoutine();

    // Save function wrapper:
    async function handleSave() {
        if (!routineData) return;

        const updatedRoutineResult: Promise<routineObject> =
            saveRoutineMutation.mutateAsync({
                endpoint: `https://localhost:5119/routines/${routineData.id}`,
                routine: routineData,
            });

        if (routineData.id === 0) {
            const updatedRoutine = await updatedRoutineResult;
            navigate(`/edit-routine/${updatedRoutine.id}`, { replace: true });
        }
    }

    // CRUD function wrappers:
    const updateExercise = (index: number, updated: routineExerciseObject) => {
        if (routineData) {
            const newExercises: routineExerciseObject[] = [
                ...routineData.exercises,
            ];

            newExercises[index] = updated;
            setRoutineData({ ...routineData, exercises: newExercises });
        }
    };

    const addExercise = () => {
        if (!routineData) return;
        const newExercise = createNewExercise(
            routineData.id,
            allExercises,
            tempIdCounter,
            routineData.exercises.length
        );

        const newExercises = addItem(routineData.exercises, newExercise);
        setRoutineData({ ...routineData, exercises: newExercises });
    };

    return (
        <div>
            {routineData && (
                <div>
                    <div>
                        <input
                            value={routineData.name}
                            onChange={(e) => {
                                setRoutineData({
                                    ...routineData,
                                    name: e.target.value,
                                });
                            }}
                        ></input>
                        <button
                            className={styles.saveButton}
                            onClick={() => {
                                handleSave();
                            }}
                        >
                            💾
                        </button>
                    </div>
                    {routineData.exercises
                        .sort((a, b) => a.order - b.order)
                        .map(
                            (
                                exercise: routineExerciseObject,
                                index: number
                            ) => (
                                <RoutineExerciseEditCard
                                    key={exercise.id}
                                    exerciseData={exercise}
                                    updateExercise={(updated) =>
                                        updateExercise(index, updated)
                                    }
                                />
                            )
                        )}
                    <button
                        className={styles.addButton}
                        onClick={() => {
                            addExercise();
                        }}
                    >
                        +
                    </button>
                </div>
            )}
        </div>
    );
}

export default RoutineEditCard;
