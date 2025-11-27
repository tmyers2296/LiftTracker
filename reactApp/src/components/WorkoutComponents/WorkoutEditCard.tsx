import { useWorkoutData } from "../../pages/WorkoutPages/RecordRoutineWorkout.tsx";
import RoutineExerciseDisplayCard from "./RoutineExerciseDisplayCard.tsx";
import { routineExerciseObject } from "../../types/routineTypes.ts";
import { workoutExerciseObject } from "../../types/workoutTypes.ts";
import styles from "./WorkoutComponents.module.css";
import WorkoutExerciseEditCard from "./WorkoutExerciseEditCard.tsx";

function WorkoutEditCard() {
    const { recordedIDList, routineData, workoutData } = useWorkoutData();

    return (
        <div>
            {Object.keys(recordedIDList).map((currentId) => (
                <div>
                    {currentId} | {recordedIDList[Number(currentId)]}
                </div>
            ))}
            <div className={styles.itemBox}>
                <div>Exercises Being Recorded</div>
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
            </div>
            <div className={styles.itemBox}>
                <div>Exercises to Record</div>
                <div>
                    {routineData &&
                        routineData.exercises.map(
                            (exercise: routineExerciseObject) =>
                                !Object.values(recordedIDList).includes(
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
