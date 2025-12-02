import { IdMappingsState, IdMappingsAction } from "../types/idmappings.types";

export const initialIdMappings: IdMappingsState = {
    exerciseMap: {},
    setMap: {},
};

export function idMappingsReducer(
    state: IdMappingsState,
    action: IdMappingsAction
): IdMappingsState {
    switch (action.type) {
        case "MAP_EXERCISE":
            return {
                ...state,
                exerciseMap: {
                    ...state.exerciseMap,
                    [action.workoutExerciseId]: action.routineExerciseId,
                },
            };

        case "DELETE_EXERCISE_MAPPING":
            const { [action.workoutExerciseId]: _exercises, ...restExercises } =
                state.exerciseMap;

            return { ...state, exerciseMap: restExercises };

        case "MAP_SET":
            return {
                ...state,
                setMap: {
                    ...state.setMap,
                    [action.workoutSetId]: action.routineSetId,
                },
            };

        case "DELETE_SET_MAPPING":
            const { [action.workoutSetId]: _sets, ...restSets } = state.setMap;

            return { ...state, setMap: restSets };

        case "RESET_ALL":
            return initialIdMappings;

        default:
            return state;
    }
}
