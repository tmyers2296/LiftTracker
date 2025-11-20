import AuthorizeView from "../components/AuthorizeView.tsx";
import { fetchData } from "../modules/apiFunctions.tsx";
import RoutineCard from "../components/RoutineComponents/RoutineCard/RoutineCard.tsx";
import { routineObject } from "../types/routineTypes.ts";
import { useNavigate } from "react-router-dom";
import styles from "./MainPages.module.css";
import { useQuery } from "@tanstack/react-query";
import { NavBar } from "../components/Navigation/NavBar.tsx";

function Home() {
    const navigate = useNavigate();

    const fetchRoutines = async () => {
        const data = await fetchData(
            "https://localhost:5119/routines?pageNumber=1&pageSize=20"
        );
        return data.routines;
    };

    const {
        data: routines,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["routines"], // cache key
        queryFn: fetchRoutines, // function that fetches data
    });

    return (
        <AuthorizeView>
            <NavBar />
            <div className={styles.itemBox}>
                {!isLoading &&
                    !isError &&
                    routines.length > 0 &&
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
