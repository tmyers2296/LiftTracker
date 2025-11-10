import { useRoutineData } from "../../../pages/RoutinePages/EditRoutine";
import RoutineExerciseEditCard2 from "../RoutineEditCards2/RoutineExerciseEditCard2";
import { routineExerciseObject } from "../../../types/routineTypes.ts";
import styles from "./RoutineEditCard2.module.css";
import { createNewExercise } from "../../../modules/itemFactories.tsx";
import { addItem } from "../../../modules/editingFunctions.tsx";

function RoutineEditCard2() {
    const { routineData, setRoutineData, allExercises, tempIdCounter } =
        useRoutineData();

    // !save function! :
    async function saveRoutine() {
        if (!routineData) return;

        console.log(
            "rendered exercise set IDs:",
            routineData.exercises.map((e) => e.sets.map((s) => s.id))
        );

        const payload = {
            ...routineData,
            exercises: routineData.exercises?.map((exercise) => ({
                ...exercise,
                id: exercise.id < 0 ? 0 : exercise.id,
                sets: exercise.sets.map((set) => ({
                    ...set,
                    id: set.id < 0 ? 0 : set.id,
                })),
            })),
        };

        console.log(
            "rendered exercise set IDs:",
            routineData.exercises.map((e) => e.sets.map((s) => s.id))
        );
        //console.log(payload);
        //console.log(JSON.stringify(payload, null, 2));

        try {
            // Step 2: Send PUT or POST request to your API
            const response = await fetch(
                `https://localhost:5119/routines/${routineData.id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to save routine");
            }

            const updatedRoutine = await response.json();

            // Step 3: Update local state with server data (real IDs)
            setRoutineData(updatedRoutine);

            // Step 4: Optionally notify the user or reset edit mode
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
                        <span>{routineData.name} →</span>
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
