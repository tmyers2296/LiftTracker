import { useWorkoutData } from "../../pages/WorkoutPages/RecordRoutineWorkout.tsx";
import RoutineExerciseDisplayCard from "./RoutineExerciseDisplayCard.tsx";
import { routineExerciseObject } from "../../types/routineTypes.ts";
import styles from "./WorkoutComponents.module.css";

function WorkoutEditCard() {
    const { routineData, tempIdCounter } = useWorkoutData();

    console.log(routineData);
    console.log(tempIdCounter);

    return (
        <div>
            <div className={styles.itemBox}>
                <div>Exercises to Record</div>
                <div>
                    {routineData &&
                        routineData.exercises.map(
                            (exercise: routineExerciseObject) => (
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
