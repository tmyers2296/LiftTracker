import LogoutLink from "../components/LogoutLink.tsx";
import AuthorizeView, { AuthorizedUser } from "../components/AuthorizeView.tsx";
import { useState, useEffect } from "react";
import { fetchData } from "../modules/fetchingFunctions.tsx";
import RoutineCard from "../components/RoutineComponents/RoutineCard/RoutineCard.tsx";
import { routineObject } from "../types/routineTypes.ts";
import { useNavigate } from "react-router-dom";
import styles from "./MainPages.module.css";

function Home() {
    const [idNum, setidNum] = useState<string>("1");
    const [currentId, setCurrentId] = useState<string>("1");

    const [testData, setTestData] = useState<routineObject[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchExerciseData(url: string) {
            try {
                // promise for when data is retrieved from API:
                let dataPromise = fetchData(url);

                // waits for data to be retrieved from API:
                const data = await dataPromise;

                // sets exerciseData:
                setTestData(data.routines);

                // catch & show any errors:
            } catch (err) {
                console.error(err);
            }
        }

        fetchExerciseData(
            "https://localhost:5119/routines?pageNumber=1&pageSize=20"
        );
    }, []);

    return (
        <AuthorizeView>
            <div>
                <LogoutLink>
                    Logout <AuthorizedUser value="email" />
                </LogoutLink>
            </div>

            <input
                type="text"
                value={idNum}
                onChange={(e) => setidNum(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        setCurrentId(idNum);
                    }
                }}
            ></input>

            <div>
                {testData.map((data: routineObject) => (
                    <RoutineCard key={data.id} routineData={data} />
                ))}
            </div>
            <button
                className={styles.addButton}
                onClick={() => {
                    navigate(`/edit-routine/0`);
                }}
            >
                +
            </button>
        </AuthorizeView>
    );
}

export default Home;
