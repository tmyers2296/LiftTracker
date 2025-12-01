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
                    [action.routineExerciseId]: action.workoutExerciseId,
                },
            };

        case "MAP_SET":
            return {
                ...state,
                setMap: {
                    ...state.setMap,
                    [action.routineSetId]: action.workoutSetId,
                },
            };

        case "RESET_ALL":
            return initialIdMappings;

        default:
            return state;
    }
}
