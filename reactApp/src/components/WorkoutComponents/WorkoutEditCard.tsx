import { useWorkoutData } from "../../pages/WorkoutPages/RecordRoutineWorkout.tsx";
import RoutineExerciseDisplayCard from "./RoutineExerciseDisplayCard.tsx";
import { routineExerciseObject } from "../../types/routineTypes.ts";
import { workoutExerciseObject } from "../../types/workoutTypes.ts";
import styles from "./WorkoutComponents.module.css";
import WorkoutExerciseEditCard from "./WorkoutExerciseEditCard.tsx";

function WorkoutEditCard() {
    const { idMappings, routineData, workoutData } = useWorkoutData();

    return (
        <div>
            <div className={styles.itemBox}>
                <div>Routine: {routineData?.name}</div>
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
