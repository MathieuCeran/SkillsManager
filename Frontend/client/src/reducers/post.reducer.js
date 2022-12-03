import {
  DELETE_POST,
  GET_POSTS,
  UNLIKE_POST,
  UPDATE_POST,
  UPDATE_MEDIA,
  DELETE_MEDIA,
} from "../actions/post.actions";

const initialState = {};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return action.payload;
    case UPDATE_POST:
      return state.map((post) => {
        if (post.id === action.payload.postId) {
          return {
            ...post,
            texte: action.payload.texte,
          };
        } else return post;
      });
    case UPDATE_MEDIA:
      return state.map((post) => {
        if (post.id === action.payload.postId) {
          return {
            ...post,
            media: action.payload.media,
          };
        } else return post;
      });
    case DELETE_MEDIA:
      return state.map((post) => {
        if (post.id === action.payload.postId) {
          return {
            ...post,
            media: action.payload.media,
          };
        } else return post;
      });
    case DELETE_POST:
      return state.filter((post) => post.id !== action.payload.postId);

    case UNLIKE_POST:
      return state.filter((post) => {
        if (post.id === action.payload.postId) {
          return {
            ...post,
            postId: action.payload,
          };
        } else return post;
      });

    default:
      return state;
  }
}
