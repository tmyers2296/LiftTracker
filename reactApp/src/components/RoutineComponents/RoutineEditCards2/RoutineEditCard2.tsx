import { useRoutineData } from "../../../pages/RoutinePages/EditRoutine";
import RoutineExerciseEditCard2 from "../RoutineEditCards2/RoutineExerciseEditCard2";
import { routineExerciseObject } from "../../../types/routineTypes.ts";
import styles from "./RoutineEditCard2.module.css";
import { createNewExercise } from "../../../modules/itemFactories.tsx";
import { addItem } from "../../../modules/editingFunctions.tsx";
import { saveNestedObject } from "../../../modules/savingFunctions.tsx";

function RoutineEditCard2() {
    const { routineData, setRoutineData, allExercises, tempIdCounter } =
        useRoutineData();

    // Save function wrapper:
    async function saveRoutine() {
        if (!routineData) return;

        try {
            await saveNestedObject(
                `https://localhost:5119/routines/${routineData.id}`,
                routineData,
                setRoutineData
            );
            console.log("Routine saved successfully!");
        } catch (error) {
            console.error("Error saving routine:", error);
            alert("There was an issue saving your routine.");
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
                                saveRoutine();
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
                                <RoutineExerciseEditCard2
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

export default RoutineEditCard2;
