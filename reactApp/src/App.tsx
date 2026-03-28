import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import DashboardPage from "./pages/DashboardPages/DashboardPage.tsx";
import RoutinesPage from "./pages/RoutinePages/RoutinesPage.tsx";
import WorkoutsPage from "./pages/WorkoutPages/WorkoutsPage.tsx";
import EditRoutine from "./pages/RoutinePages/EditRoutine.tsx";
import EditWorkout from "./pages/WorkoutPages/EditWorkoutPage.tsx";
import RecordRoutineWorkout from "./pages/WorkoutPages/RecordRoutineWorkout.tsx";
import ImproviseWorkout from "./pages/WorkoutPages/ImproviseWorkoutPage.tsx";
import ChooseRoutinePage from "./pages/RoutinePages/ChooseRoutine.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Home />} />
                <Route path="edit-routine/:id" element={<EditRoutine />} />
                <Route path="choose-routine" element={<ChooseRoutinePage />} />
                <Route
                    path="record-routine-workout/:id"
                    element={<RecordRoutineWorkout />}
                />
                <Route
                    path="improvise-workout"
                    element={<ImproviseWorkout />}
                />
                <Route path="edit-workout/:id" element={<EditWorkout />} />
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="routines" element={<RoutinesPage />} />
                <Route path="workouts" element={<WorkoutsPage />} />
            </Routes>
        </BrowserRouter>
    );
}
export default App;
