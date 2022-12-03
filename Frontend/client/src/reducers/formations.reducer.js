import {
  GET_FORMATIONS,
  DELETE_FORMATION,
} from "../actions/formations.actions";

const initialState = {};

export default function formationsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_FORMATIONS:
      return action.payload;
    case DELETE_FORMATION:
      return state.filter(
        (formation) => formation.id !== action.payload.formationId
      );
    default:
      return state;
  }
}
