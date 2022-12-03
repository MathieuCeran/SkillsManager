import axios from "axios";

export const GET_COMMENTS = "GET_COMMENTS";
export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

export const getComments = () => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/api/message/comment/all`,
        withCredentials: true,
      });
      dispatch({
        type: GET_COMMENTS,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const addComment = (commentaire, postId) => {
  return (dispatch) => {
    return axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/api/message/comment/${postId}`,
      withCredentials: true,
      data: { commentaire: commentaire, postId: postId },
    })
      .then((res) => {
        dispatch({ type: ADD_COMMENT, payload: { postId } });
      })
      .catch((error) => console.log(error));
  };
};

export const editComment = (commentaire, commentId) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}/api/message/comment/${commentId}`,
      withCredentials: true,
      data: { commentaire: commentaire },
    })
      .then((res) => {
        dispatch({ type: ADD_COMMENT, payload: { commentId, commentaire } });
      })
      .catch((error) => console.log(error));
  };
};

export const deleteComment = (commentId) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}/api/message/comment/${commentId}`,
      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: DELETE_COMMENT, payload: { commentId } });
      })
      .catch((error) => console.log(error));
  };
};
