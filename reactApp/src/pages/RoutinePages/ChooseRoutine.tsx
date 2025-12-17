import { useNavigate } from "react-router-dom";
import { useRoutines } from "../../hooks/routineHooks";
import styles from "../MainPages.module.css";
import { routineObject } from "../../types/routineTypes";
import AuthorizeView from "../../components/AuthorizationComponents/AuthorizeView";

function ChooseRoutinePage() {
    const navigate = useNavigate();
    const { data: routines, isLoading, isError } = useRoutines(1, 100);

    return (
        <AuthorizeView>
            <div>
                <div className={styles.itemBox}>
                    <div className={styles.setHeader}>
                        Choose a Routine to Record:
                    </div>
                    {!isLoading &&
                        !isError &&
                        routines &&
                        routines.map((data: routineObject) => (
                            <button
                                className={styles.routineButton}
                                key={data.id}
                                onClick={() => {
                                    navigate(
                                        `/record-routine-workout/${data.id}`
                                    );
                                }}
                            >
                                {data.name}
                            </button>
                        ))}
                </div>
            </div>
        </AuthorizeView>
    );
}

export default ChooseRoutinePage;
