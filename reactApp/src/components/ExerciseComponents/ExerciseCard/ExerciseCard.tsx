import ExpandableCard from "../../ExpandableCard/ExpandableCard";
import { exerciseResponseObject } from "../../../types/generalTypes";
import { useNavigate } from "react-router-dom";
import { useDeleteExercise } from "../../../hooks/exerciseHooks";
import styles from "./ExerciseCard.module.css";

interface ExerciseCardProps {
    exerciseData: exerciseResponseObject;
}

function ExerciseCard({ exerciseData }: ExerciseCardProps) {
    const navigate = useNavigate();
    const deleteExerciseMutation = useDeleteExercise();

    const handleEdit = (exerciseId: number) => {
        navigate(`/edit-exercise/${exerciseId}`);
    };

    const handleDelete = () => {
        deleteExerciseMutation.mutate(exerciseData.id);
    };

    const buttonsCallbacks: {
        [key: string]: { callback: () => void; style: string };
    } = {
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
        >
            <div className={styles.exerciseDetails}>
                <div className={styles.detailLabel}>Created by</div>
                <div>{exerciseData.createdByUsername}</div>
            </div>
        </ExpandableCard>
    );
}

export default ExerciseCard;
