import ExpandableCard from "../../ExpandableCard/ExpandableCard";
import { exerciseResponseObject } from "../../../types/generalTypes";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
    useDeleteExercise,
    useExerciseMetrics,
    useHeaviestExerciseInstance,
} from "../../../hooks/exerciseHooks";
import styles from "./ExerciseCard.module.css";

interface ExerciseCardProps {
    exerciseData: exerciseResponseObject;
}

function ExerciseCard({ exerciseData }: ExerciseCardProps) {
    const navigate = useNavigate();
    const deleteExerciseMutation = useDeleteExercise();
    const [expanded, setExpanded] = useState(false);

    const { data, isLoading, isError } = useExerciseMetrics(
        exerciseData.id,
        expanded,
    );

    const handleEdit = (exerciseId: number) => {
        navigate(`/edit-exercise/${exerciseId}`);
    };

    const handleDelete = () => {
        deleteExerciseMutation.mutate(exerciseData.id);
    };

    const buttonsCallbacks: {
        [key: string]: { callback: () => void; style: string };
    } = exerciseData.isSystemExercise
        ? {}
        : {
              "📜": {
                  callback: () => {
                      handleEdit(exerciseData.id);
                  },
                  style: styles.toggleButton,
              },

              "💣": {
                  callback: () => {
                      handleDelete();
                  },
                  style: styles.deleteButton,
              },
          };

    return (
        <ExpandableCard
            cardName={exerciseData.name}
            className={styles.topLayerCard}
            buttons={buttonsCallbacks}
            onExpand={() => setExpanded((prev) => !prev)}
        >
            <div className={styles.exerciseDetails}>
                <div className={styles.detailLabel}>Created by</div>
                <div>{exerciseData.createdByUsername}</div>
                {!isLoading && !isError && data && (
                    <div>
                        <div className={styles.detailLabel}>Heaviest Set</div>
                        <div>
                            {`${data.heaviest.reps} x ${data.heaviest.weight}kg @ ${data.heaviest.date.getDate()}-${data.heaviest.date.getMonth() + 1}-${data.heaviest.date.getFullYear()}`}
                        </div>
                        <div className={styles.detailLabel}>
                            Most Volume Set
                        </div>
                        <div>
                            {`${data.mostVolume.reps} x ${data.mostVolume.weight}kg @ ${data.mostVolume.date.getDate()}-${data.mostVolume.date.getMonth() + 1}-${data.mostVolume.date.getFullYear()}`}
                        </div>
                    </div>
                )}
            </div>
        </ExpandableCard>
    );
}

export default ExerciseCard;
