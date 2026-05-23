import { useNavigate } from "react-router-dom";
import { useSaveExercise } from "../../../hooks/exerciseHooks";
import { useExerciseData } from "../../../pages/ExercisePages/EditExercise";
import { exerciseObject } from "../../../types/generalTypes";
import styles from "./ExerciseEditCard.module.css";

function ExerciseEditCard() {
    const navigate = useNavigate();
    const { exerciseData, setExerciseData } = useExerciseData();
    const saveExerciseMutation = useSaveExercise();

    async function handleSave() {
        if (!exerciseData) return;

        const updatedExercise: exerciseObject =
            await saveExerciseMutation.mutateAsync({
                endpoint: `https://localhost:5119/exercises/${exerciseData.id}`,
                exercise: exerciseData,
            });

        if (exerciseData.id === 0) {
            navigate(`/edit-exercise/${updatedExercise.id}`, {
                replace: true,
            });
        }
    }

    return (
        <div className={styles.container}>
            {exerciseData && (
                <div className={styles.editCard}>
                    <input
                        className={styles.nameInput}
                        value={exerciseData.name}
                        onChange={(e) => {
                            setExerciseData({
                                ...exerciseData,
                                name: e.target.value,
                            });
                        }}
                    />
                    <button
                        className={styles.saveButton}
                        onClick={() => {
                            handleSave();
                        }}
                        type="button"
                    >
                        💾
                    </button>
                </div>
            )}
        </div>
    );
}

export default ExerciseEditCard;
