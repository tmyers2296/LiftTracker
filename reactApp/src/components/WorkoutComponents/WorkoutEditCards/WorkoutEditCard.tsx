import { useWorkoutData } from "../../../pages/WorkoutPages/RecordRoutineWorkout.tsx";
import RoutineExerciseDisplayCard from "./RoutineExerciseDisplayCard.tsx";
import { routineExerciseObject } from "../../../types/routineTypes.ts";
import { workoutExerciseObject } from "../../../types/workoutTypes.ts";
import { useSaveWorkout } from "../../../hooks/workoutHooks.tsx";
import styles from "../WorkoutComponents.module.css";
import WorkoutExerciseEditCard from "./WorkoutExerciseEditCard.tsx";

function WorkoutEditCard() {
    const { idMappings, routineData, workoutData } = useWorkoutData();

    const saveWorkoutMutation = useSaveWorkout();

    // Save function wrapper:
    function handleSave() {
        if (!workoutData) return;

        saveWorkoutMutation.mutate({
            endpoint: `https://localhost:5119/workouts/${workoutData.id}`,
            workout: workoutData,
        });
    }

    return (
        <div>
            <div className={styles.itemBoxNoPadding}>
                <div className={styles.itemBox2header}>
                    <div className={styles.item}>
                        Routine: {routineData?.name}
                    </div>
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
                                <WorkoutExerciseEditCard
                                    key={exercise.id}
                                    exerciseData={exercise}
                                />
                            )
                        )}
                </div>
                <div>
                    {routineData &&
                        routineData.exercises.map(
                            (exercise: routineExerciseObject) =>
                                !Object.values(idMappings.exerciseMap).includes(
                                    exercise.id
                                ) && (
                                    <RoutineExerciseDisplayCard
                                        key={exercise.id}
                                        exerciseData={exercise}
                                    />
                                )
                        )}
                </div>
            </div>
        </div>
    );
}

export default WorkoutEditCard;
