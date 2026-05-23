import ExpandableCard from "../../ExpandableCard/ExpandableCard";
import { exerciseObject } from "../../../types/generalTypes";
import { useNavigate } from "react-router-dom";
import styles from "./ExerciseCard.module.css";

interface ExerciseCardProps {
    exerciseData: exerciseObject;
}

function ExerciseCard({ exerciseData }: ExerciseCardProps) {
    const navigate = useNavigate();

    const buttonsCallbacks: {
        [key: string]: { callback: () => void; style: string };
    } = {
        "✏️": {
            callback: () => {
                navigate(`/edit-exercise/${exerciseData.id}`);
            },
            style: styles.toggleButton,
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
                <div>{exerciseData.createdBy}</div>
            </div>
        </ExpandableCard>
    );
}

export default ExerciseCard;
