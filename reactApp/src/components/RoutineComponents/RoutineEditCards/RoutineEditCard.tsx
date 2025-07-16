import styles from "./RoutineEditCard.module.css";
import { useNavigate } from "react-router-dom";
import RoutineExerciseEditCard from "./RoutineExerciseEditCard.tsx";
import {
    routineObject,
    routineExerciseObject,
} from "../../../types/routineTypes.ts";

import EditableCard from "../../EditableCard/EditableCard.tsx";

interface RoutineCardProps {
    routineData: routineObject;
}

function RoutineEditCard({ routineData }: RoutineCardProps) {
    const navigate = useNavigate();
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
