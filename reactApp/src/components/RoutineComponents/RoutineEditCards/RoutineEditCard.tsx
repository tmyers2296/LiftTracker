import styles from "./RoutineEditCard.module.css";
import RoutineExerciseEditCard from "./RoutineExerciseEditCard.tsx";
import { routineObject } from "../../../types/routineTypes.ts";
import EditableCard from "../../EditableCard/EditableCard.tsx";

interface RoutineCardProps {
    routineData: routineObject;
}

function RoutineEditCard({ routineData }: RoutineCardProps) {
    // rendering functions:

    return (
        <EditableCard
            cardName={routineData.name}
            className={styles.topLayerCard}
            layerData={routineData}
            createItemButton={true}
            subComponent={RoutineExerciseEditCard}
        ></EditableCard>
    );
}

export default RoutineEditCard;
