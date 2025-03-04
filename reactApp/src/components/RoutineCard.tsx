import { routineObject } from "../types/routineTypes";

interface RoutineCardProps {
  routineData: routineObject;
}

function RoutineCard({ routineData }: RoutineCardProps) {
  return <div>{`${routineData.name} -> ${routineData.exercisesList}`}</div>;
}

export default RoutineCard;
