import { NavBar } from "../../components/Navigation/NavBar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useExercises } from "../../hooks/exerciseHooks";
import styles from "../MainPages.module.css";
import { exerciseResponseObject } from "../../types/generalTypes";
import ExerciseCard from "../../components/ExerciseComponents/ExerciseCard/ExerciseCard";
import AuthorizeView from "../../components/AuthorizationComponents/AuthorizeView";

function ExercisesPage() {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const {
        data: exercises,
        isLoading,
        isError,
    } = useExercises(currentPage, 5);

    return (
        <AuthorizeView>
            <div>
                <NavBar />
                <div className={styles.itemBox}>
                    {!isLoading &&
                        !isError &&
                        exercises &&
                        exercises.items.map((data: exerciseResponseObject) => (
                            <ExerciseCard key={data.id} exerciseData={data} />
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
                            disabled={!exercises?.hasMore}
                        >
                            {">"}
                        </button>
                    </div>
                    <button
                        className={styles.addButton}
                        onClick={() => {
                            navigate(`/edit-exercise/0`);
                        }}
                    >
                        +
                    </button>
                </div>
            </div>
        </AuthorizeView>
    );
}

export default ExercisesPage;
