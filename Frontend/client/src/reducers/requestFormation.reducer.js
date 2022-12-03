import {
    GET_REQUESTFORMATION,
    CREAT_REQUESTFORMATION,
    EDIT_REQUESTFORMATION,
    DELETE_REQUESTFORMATIONS,
    EDIT_REQUESTSUBFORMATION,
} from "../actions/requestFormation.actions";

const initialState = {};

export default function requestFormationReducer(state = initialState, action) {
    switch (action.type) {
        case GET_REQUESTFORMATION:
            return action.payload;
        case CREAT_REQUESTFORMATION:
            return action.payload;
        case EDIT_REQUESTFORMATION:
            return state.map((formation) => {
                if (formation.id === action.payload.formationId) {
                    return {
                        ...formation,
                        formationStatus: action.payload.formationStatus,
                    };
                } else return formation;
            });
        case EDIT_REQUESTSUBFORMATION:
            return state.map((formation) => {
                if (formation.id === action.payload.subformationId) {
                    return {
                        ...formation,
                        formationStatus: action.payload.formationStatus,
                    };
                } else return formation;
            });
        case DELETE_REQUESTFORMATIONS:
            return state.filter(
                (formation) => formation.id !== action.payload.formationId
            );
        default:
            return state;
    }
}
