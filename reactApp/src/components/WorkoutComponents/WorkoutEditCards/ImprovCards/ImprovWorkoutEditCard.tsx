import { workoutDataGetSet } from "../../../../types/contextTypes.ts";
import {
    workoutObject,
    workoutExerciseObject,
} from "../../../../types/workoutTypes.ts";
import { useSaveWorkout } from "../../../../hooks/workoutHooks.tsx";
import styles from "../../WorkoutComponents.module.css";
import ImprovWorkoutExerciseEditCard from "./ImprovWorkoutExerciseEditCard.tsx";
import { createNewWorkoutExercise } from "../../../../modules/itemFactories.tsx";
import { addItem } from "../../../../modules/editingFunctions.tsx";
import { useNavigate } from "react-router-dom";

interface ImprovWorkoutEditCardProps {
    contextHookCallback: () => workoutDataGetSet;
}

function ImprovWorkoutEditCard({
    contextHookCallback,
}: ImprovWorkoutEditCardProps) {
    const navigate = useNavigate();
    const { setWorkoutData, workoutData, allExercises, tempIdCounter } =
        contextHookCallback();

    const saveWorkoutMutation = useSaveWorkout();

    // Save function wrapper:
    async function handleSave() {
        if (!workoutData) return;

        const updatedWorkoutResult: Promise<workoutObject> =
            saveWorkoutMutation.mutateAsync({
                endpoint: `https://localhost:5119/workouts/${workoutData.id}`,
                workout: workoutData,
            });

        if (workoutData.id === 0) {
            const updateWorkout = await updatedWorkoutResult;

            navigate(`/edit-workout/${updateWorkout.id}`, { replace: true });
        }
    }

    const addExercise = () => {
        if (!workoutData) return;

        const newExercise = createNewWorkoutExercise(
            workoutData.id,
            allExercises[0].id,
            tempIdCounter,
            workoutData.exercises.length
        );

        const newExercises = addItem(workoutData.exercises, newExercise);
        setWorkoutData({ ...workoutData, exercises: newExercises });
    };

    return (
        <div>
            <div className={styles.itemBoxNoPadding}>
                <div className={styles.itemBox2header}>
                    <input
                        value={workoutData.name}
                        onChange={(e) => {
                            setWorkoutData({
                                ...workoutData,
                                name: e.target.value,
                            });
                        }}
                        className={styles.item}
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
                <div>
                    {workoutData &&
                        workoutData.exercises.map(
                            (exercise: workoutExerciseObject) => (
                                <ImprovWorkoutExerciseEditCard
                                    key={exercise.id}
                                    exerciseData={exercise}
                                    contextHookCallback={contextHookCallback}
                                />
                            )
                        )}
                </div>
                <div>
                    <button
                        className={styles.addButton}
                        onClick={() => {
                            addExercise();
                        }}
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ImprovWorkoutEditCard;
