import ExpandableCard from "../../ExpandableCard/ExpandableCard";
import { exerciseObject } from "../../../types/generalTypes";
import styles from "./ExerciseCard.module.css";

interface ExerciseCardProps {
    exerciseData: exerciseObject;
}

function ExerciseCard({ exerciseData }: ExerciseCardProps) {
    return (
        <ExpandableCard
            cardName={exerciseData.name}
            className={styles.topLayerCard}
        >
            <div className={styles.exerciseDetails}>
                <div className={styles.detailLabel}>Created by</div>
                <div>{exerciseData.createdBy}</div>
            </div>
        </ExpandableCard>
    );
}

export default ExerciseCard;
