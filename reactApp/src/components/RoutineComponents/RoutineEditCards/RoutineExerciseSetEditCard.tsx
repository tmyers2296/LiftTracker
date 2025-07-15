import { routineExerciseSetObject } from "../../../types/routineTypes.ts";
import EditableCard from "../../EditableCard/EditableCard.tsx";
import styles from "./RoutineEditCard.module.css";

function RoutineExerciseSetEditCard(set: routineExerciseSetObject) {
    return (
        <EditableCard
            key={set.id}
            className={styles.exerciseSet}
            layerData={set}
            createItemButton={false}
        >
            <div className={styles.setEditor}>
                <input
                    defaultValue={set.repRangeLow}
                    className={styles.inputBox}
                />
                <span> - </span>
                <input
                    defaultValue={set.repRangeHigh}
                    className={styles.inputBox}
                />
            </div>
        </EditableCard>
    );
}

export default RoutineExerciseSetEditCard;
