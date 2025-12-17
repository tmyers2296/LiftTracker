import styles from "./RoutineEditCard.module.css";
import { useState } from "react";
import { routineExerciseSetObject } from "../../../types/routineTypes";
import { useRoutineData } from "../../../pages/RoutinePages/EditRoutine";
import {
    swapOrder,
    updateItem,
    removeItem,
} from "../../../modules/editingFunctions";

interface RoutineExerciseSetEditCard2Props {
    setData: routineExerciseSetObject;
    exerciseId: number;
}

function RoutineExerciseEditSetCard({
    setData,
    exerciseId,
}: RoutineExerciseSetEditCard2Props) {
    const { routineData, setRoutineData } = useRoutineData();
    const routineExists = routineData?.id !== 0;

    const [hasTypedLow, setHasTypedLow] = useState<boolean>(routineExists);
    const [hasTypedHigh, setHasTypedHigh] = useState<boolean>(routineExists);

    // CRUD function wrappers:
    const updateExerciseSet = (
        exerciseId: number,
        updatedSet: routineExerciseSetObject
    ) => {
        if (!routineData) return;

        const exerciseToUpdate = routineData.exercises.find(
            (ex) => ex.id === exerciseId
        );

        if (!exerciseToUpdate) return;

        const updatedExercise = {
            ...exerciseToUpdate,
            sets: updateItem(exerciseToUpdate.sets, updatedSet),
        };

        setRoutineData({
            ...routineData,
            exercises: updateItem(routineData.exercises, updatedExercise),
        });
    };

    const removeSet = (exerciseId: number, setId: number) => {
        if (!routineData) return;

        const exerciseToUpdate = routineData.exercises.find(
            (ex) => ex.id === exerciseId
        );

        if (!exerciseToUpdate) return;

        const updatedExercises = updateItem(routineData.exercises, {
            ...exerciseToUpdate,
            sets: removeItem(exerciseToUpdate.sets, setId),
        });

        setRoutineData({ ...routineData, exercises: updatedExercises });
    };

    // Shifting function wrapper:
    const shiftSetOrder = (direction: "up" | "down") => {
        if (!routineData) return;

        const exercise = routineData.exercises.find((e) => e.id === exerciseId);

        if (!exercise) return;

        const newSets = swapOrder(exercise.sets, setData.id, direction);

        setRoutineData({
            ...routineData,
            exercises: routineData.exercises.map((exercise) =>
                exercise.id === exerciseId
                    ? { ...exercise, sets: newSets }
                    : exercise
            ),
        });
    };

    return (
        <div>
            {setData && (
                <div>
                    {/* <div>{`     set => ${setData.repRangeLow} | id => ${setData.id}`}</div> */}
                    <button
                        className={styles.updownButton}
                        onClick={() => {
                            shiftSetOrder("down");
                        }}
                    >
                        ↑
                    </button>
                    <button
                        className={styles.updownButton}
                        onClick={() => {
                            shiftSetOrder("up");
                        }}
                    >
                        ↓
                    </button>
                    {/* <input
                        className={styles.inputBoxSmallBlue}
                        value={setData.order}
                        onChange={(e) =>
                            updateExerciseSet(exerciseId, {
                                ...setData,
                                order: Number(e.target.value),
                            })
                        }
                    ></input> */}
                    <input
                        className={styles.inputBoxSmall}
                        value={
                            !hasTypedLow && setData.repRangeLow === 0
                                ? ""
                                : setData.repRangeLow
                        }
                        onChange={(e) => {
                            if (!/^\d*$/.test(e.target.value)) return;
                            setHasTypedLow(
                                e.target.value === "" ? false : true
                            );
                            updateExerciseSet(exerciseId, {
                                ...setData,
                                repRangeLow: Number(e.target.value),
                            });
                        }}
                    ></input>
                    -
                    <input
                        className={styles.inputBoxSmall}
                        value={
                            !hasTypedHigh && setData.repRangeHigh === 0
                                ? ""
                                : setData.repRangeHigh
                        }
                        onChange={(e) => {
                            if (!/^\d*$/.test(e.target.value)) return;
                            setHasTypedHigh(
                                e.target.value === "" ? false : true
                            );
                            updateExerciseSet(exerciseId, {
                                ...setData,
                                repRangeHigh: Number(e.target.value),
                            });
                        }}
                    ></input>
                    <button
                        className={styles.deleteButton}
                        onClick={() => {
                            removeSet(exerciseId, setData.id);
                        }}
                    >
                        ✖️
                    </button>
                </div>
            )}
        </div>
    );
}

export default RoutineExerciseEditSetCard;
