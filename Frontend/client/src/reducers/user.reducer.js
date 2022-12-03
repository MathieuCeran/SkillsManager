import { GET_USER, UPLOAD_PICTURE, PROFIL_EDIT } from "../actions/user.actions";

const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.payload;
    case UPLOAD_PICTURE:
      return {
        ...state,
        media: action.payload,
      };
    case PROFIL_EDIT:
      return {
        ...state,
        profil: action.payload,
      };
    default:
      return state;
  }
}
