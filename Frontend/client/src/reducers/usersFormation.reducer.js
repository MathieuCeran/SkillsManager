import {
  GET_USERSFORMATIONS,
  CREAT_USERSFORMATIONS,
  DELETE_USERSFORMATIONS,
  GET_ALLUSERSFORMATIONS,
} from "../actions/usersFormation.actions";

const initialState = {};

export default function usersformationsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERSFORMATIONS:
      return action.payload;
    case GET_ALLUSERSFORMATIONS:
      return action.payload;
    case CREAT_USERSFORMATIONS:
      return action.payload;
    case DELETE_USERSFORMATIONS:
      return state.filter(
        (formation) => formation.id !== action.payload.formationId
      );
    default:
      return state;
  }
}
