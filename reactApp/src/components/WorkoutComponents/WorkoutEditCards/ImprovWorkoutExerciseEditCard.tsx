import { useWorkoutData } from "../../../pages/WorkoutPages/ImproviseWorkoutPage.tsx";
import { workoutExerciseObject } from "../../../types/workoutTypes.ts";
import { removeItem } from "../../../modules/editingFunctions.tsx";
import styles from "../WorkoutComponents.module.css";
import WorkoutExerciseSetEditCard from "./WorkoutExerciseSetEditCard.tsx";

interface WorkoutExerciseDisplayCardProps {
    exerciseData: workoutExerciseObject;
}

function ImprovWorkoutExerciseEditCard({
    exerciseData,
}: WorkoutExerciseDisplayCardProps) {
    const { allExercises, workoutData, setWorkoutData } = useWorkoutData();

    const removeExercise = (exerciseId: number) => {
        if (!workoutData) return;
        const updatedExercises = removeItem(workoutData.exercises, exerciseId);

        setWorkoutData({ ...workoutData, exercises: updatedExercises });
    };

    return (
        <div className={styles.itemBoxNoPadding}>
            <div className={styles.itemBox2header}>
                <div className={styles.item}>
                    {exerciseData &&
                        allExercises?.find(
                            (exercise) =>
                                exercise.id === exerciseData.exerciseId
                        )?.name}
                </div>
                <button
                    onClick={() => {
                        removeExercise(exerciseData.id);
                    }}
                >
                    💣
                </button>
            </div>
            <div>
                <div>
                    {exerciseData.sets.map((set) => (
                        <WorkoutExerciseSetEditCard
                            key={set.id}
                            setData={set}
                            exerciseId={exerciseData.id}
                        />
                    ))}
                </div>
                <div></div>
            </div>
        </div>
    );
}

export default ImprovWorkoutExerciseEditCard;
