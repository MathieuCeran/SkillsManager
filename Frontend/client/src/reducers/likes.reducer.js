import { GET_LIKE } from "../actions/likes.actions";
import { LIKE_POST, UNLIKE_POST } from "../actions/post.actions";

const initialState = {};

export default function likesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LIKE:
      return action.payload;
    case LIKE_POST:
      return state.map((like) => {
        if (like.postId === action.payload.postId) {
          return {
            ...like,
            userId: [action.payload.userId],
          };
        }
        return like;
      });
    case UNLIKE_POST:
      return state.map((like) => {
        if (like.postId === action.payload.postId) {
          return {
            ...like,
            userId: like.filter((userId) => userId !== action.payload.userId),
          };
        }
        return like;
      });
    default:
      return state;
  }
}
