import { useDashboardData } from "../../pages/DashboardPages/EditDashboard";
import { useNavigate } from "react-router-dom";
import { dashboardExerciseObject } from "../../types/dashboardTypes";
import { createNewDashboardExercise } from "../../modules/itemFactories";
import { addItem } from "../../modules/editingFunctions";

function DashboardEditCard() {
    const navigate = useNavigate();
    const { dashboardData, setDashboardData, allExercises, tempIdCounter } =
        useDashboardData();

    // CRUD function wrappers:
    const updateExercise = (
        index: number,
        updated: dashboardExerciseObject,
    ) => {
        if (dashboardData) {
            const newExercises: dashboardExerciseObject[] = [
                ...dashboardData.exercises,
            ];

            newExercises[index] = updated;
            setDashboardData({ ...dashboardData, exercises: newExercises });
        }
    };

    const addExercise = () => {
        if (!dashboardData) return;
        const newExercise = createNewDashboardExercise(
            allExercises,
            tempIdCounter,
            dashboardData.exercises.length,
        );

        const newExercises = addItem(dashboardData.exercises, newExercise);
        setDashboardData({ ...dashboardData, exercises: newExercises });
    };
}
