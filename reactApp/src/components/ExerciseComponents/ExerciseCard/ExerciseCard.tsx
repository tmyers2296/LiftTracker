import ExpandableCard from "../../ExpandableCard/ExpandableCard";
import { exerciseResponseObject } from "../../../types/generalTypes";
import { useNavigate } from "react-router-dom";
import styles from "./ExerciseCard.module.css";

interface ExerciseCardProps {
    exerciseData: exerciseResponseObject;
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
                <div>{exerciseData.createdByUserName}</div>
            </div>
        </ExpandableCard>
    );
}

export default ExerciseCard;
