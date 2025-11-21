import AuthorizeView from "../components/AuthorizeView.tsx";
import RoutineCard from "../components/RoutineComponents/RoutineCard/RoutineCard.tsx";
import { routineObject } from "../types/routineTypes.ts";
import { useNavigate } from "react-router-dom";
import styles from "./MainPages.module.css";
import { useRoutines } from "../hooks/routineHooks.tsx";
import { NavBar } from "../components/Navigation/NavBar.tsx";

function Home() {
    const navigate = useNavigate();
    const { data: routines, isLoading, isError } = useRoutines(1, 100);

    return (
        <AuthorizeView>
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
        </AuthorizeView>
    );
}

export default Home;
