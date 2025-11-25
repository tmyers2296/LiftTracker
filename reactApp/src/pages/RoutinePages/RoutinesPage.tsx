import { NavBar } from "../../components/Navigation/NavBar";
import { useNavigate } from "react-router-dom";
import { useRoutines } from "../../hooks/routineHooks";
import styles from "../MainPages.module.css";
import { routineObject } from "../../types/routineTypes";
import RoutineCard from "../../components/RoutineComponents/RoutineCard/RoutineCard";
import AuthorizeView from "../../components/AuthorizationComponents/AuthorizeView";

function RoutinesPage() {
    const navigate = useNavigate();
    const { data: routines, isLoading, isError } = useRoutines(1, 100);

    return (
        <AuthorizeView>
            <div>
                <NavBar />
                <div className={styles.itemBox}>
                    {!isLoading &&
                        !isError &&
                        routines &&
                        routines.map((data: routineObject) => (
                            <RoutineCard key={data.id} routineData={data} />
                        ))}
                    <button
                        className={styles.addButton}
                        onClick={() => {
                            navigate(`/edit-routine/0`);
                        }}
                    >
                        +
                    </button>
                </div>
            </div>
        </AuthorizeView>
    );
}

export default RoutinesPage;
