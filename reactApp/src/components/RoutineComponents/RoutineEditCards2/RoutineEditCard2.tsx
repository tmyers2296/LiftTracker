import { useRoutineData } from "../../../pages/RoutinePages/EditRoutine";
import RoutineExerciseEditCard2 from "../RoutineEditCards2/RoutineExerciseEditCard2";
import { routineExerciseObject } from "../../../types/routineTypes.ts";
import styles from "./RoutineEditCard2.module.css";
import { createNewExercise } from "../../../modules/itemFactories.tsx";
import { addItem } from "../../../modules/editingFunctions.tsx";
import { useSaveRoutine } from "../../../hooks/routineHooks.tsx";
// import { saveNestedObject } from "../../../modules/savingFunctions.tsx";

function RoutineEditCard2() {
    //Hooks:
    const { routineData, setRoutineData, allExercises, tempIdCounter } =
        useRoutineData();

    const saveRoutineMutation = useSaveRoutine();

    // Save function wrapper:

    function handleSave() {
        if (!routineData) return;

        saveRoutineMutation.mutate({
            endpoint: `https://localhost:5119/routines/${routineData.id}`,
            routine: routineData,
        });
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
