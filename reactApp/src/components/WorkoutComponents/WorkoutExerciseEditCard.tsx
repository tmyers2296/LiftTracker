import { useWorkoutData } from "../../pages/WorkoutPages/RecordRoutineWorkout.tsx";
import { workoutExerciseObject } from "../../types/workoutTypes.ts";
import { removeItem } from "../../modules/editingFunctions.tsx";
import styles from "./WorkoutComponents.module.css";
import RoutineExerciseSetDisplayCard from "./RoutineExerciseSetDisplayCard.tsx";
import WorkoutExerciseSetEditCard from "./WorkoutExerciseSetEditCard.tsx";
import {
    routineExerciseObject,
    routineExerciseSetObject,
} from "../../types/routineTypes.ts";

interface WorkoutExerciseDisplayCardProps {
    exerciseData: workoutExerciseObject;
}

function WorkoutExerciseEditCard({
    exerciseData,
}: WorkoutExerciseDisplayCardProps) {
    const {
        idMappings,
        dispatchIdMappings,
        allExercises,
        workoutData,
        setWorkoutData,
        routineData,
    } = useWorkoutData();

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
                        dispatchIdMappings({
                            type: "DELETE_EXERCISE_MAPPING",
                            workoutExerciseId: exerciseData.id,
                        });
                        exerciseData.sets.map((set) =>
                            dispatchIdMappings({
                                type: "DELETE_SET_MAPPING",
                                workoutSetId: set.id,
                            })
                        );
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
                <div>
                    {routineData &&
                        routineData.exercises
                            .find(
                                (exercise: routineExerciseObject) =>
                                    exercise.id ===
                                    idMappings.exerciseMap[exerciseData.id]
                            )
                            ?.sets.map(
                                (set: routineExerciseSetObject) =>
                                    !Object.values(idMappings.setMap).includes(
                                        set.id
                                    ) && (
                                        <RoutineExerciseSetDisplayCard
                                            key={set.id}
                                            setData={set}
                                            workoutExerciseId={exerciseData.id}
                                        />
                                    )
                            )}
                </div>
            </div>
        </div>
    );
}

export default WorkoutExerciseEditCard;
