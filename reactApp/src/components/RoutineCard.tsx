import { routineObject } from "../types/routineTypes";

interface RoutineCardProps {
    routineData: routineObject;
}

function RoutineCard({ routineData }: RoutineCardProps) {
    return (
        <div className="routine-card">
            <h2>{routineData.name}</h2>
            {routineData.exercises && routineData.exercises.length > 0 ? (
                <ul>
                    {routineData.exercises.map((exercise: any, idx: number) => (
                        <li key={exercise.id || idx}>{exercise.exerciseId}</li>
                    ))}
                </ul>
            ) : (
                <p>No exercises in this routine.</p>
            )}
        </div>
    );
}

export default RoutineCard;
