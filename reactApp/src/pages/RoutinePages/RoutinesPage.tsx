import { NavBar } from "../../components/Navigation/NavBar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRoutines } from "../../hooks/routineHooks";
import styles from "../MainPages.module.css";
import { routineObject } from "../../types/routineTypes";
import RoutineCard from "../../components/RoutineComponents/RoutineCard/RoutineCard";
import AuthorizeView from "../../components/AuthorizationComponents/AuthorizeView";

function RoutinesPage() {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const { data: routines, isLoading, isError } = useRoutines(currentPage, 5);

    return (
        <AuthorizeView>
            <div>
                <NavBar />
                <div className={styles.itemBox}>
                    {!isLoading &&
                        !isError &&
                        routines &&
                        routines.items.map((data: routineObject) => (
                            <RoutineCard key={data.id} routineData={data} />
                        ))}
                    <div className={styles.itemBox2}>
                        <button
                            onClick={() => {
                                setCurrentPage(currentPage - 1);
                            }}
                            disabled={currentPage <= 1}
                        >
                            {"<"}
                        </button>
                        <button
                            onClick={() => {
                                setCurrentPage(currentPage + 1);
                            }}
                            disabled={!routines?.hasMore}
                        >
                            {">"}
                        </button>
                    </div>
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
