import axios from "axios";

//post
export const GET_POSTS = "GET-POSTS";
export const UPDATE_POST = "UPDATE-POST";
export const UPDATE_MEDIA = "UPDATE-MEDIA";
export const DELETE_MEDIA = "DELETE-MEDIA";
export const DELETE_POST = "DELETE-POST";
export const ADD_POST = "ADD_POST";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "LIKE_POST";

export const getPosts = (numb) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}/api/message/`, {
        withCredentials: true,
      })
      .then((res) => {
        const array = res.data;
        const newArray = array.reverse().slice(0, numb);
        dispatch({ type: GET_POSTS, payload: newArray });
      })
      .catch((error) => console.log(error));
  };
};

export const updatePost = (postId, texte) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "put",
        url: `${process.env.REACT_APP_API_URL}/api/message/` + postId,
        withCredentials: true,
        data: { texte },
      });
      dispatch({
        type: UPDATE_POST,
        payload: { texte, postId },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateMedia = (postId, media) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "put",
        url: `${process.env.REACT_APP_API_URL}/api/message/` + postId,
        withCredentials: true,
        data: media,
      });
      dispatch({
        type: UPDATE_MEDIA,
        payload: { media, postId },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const deletePost = (postId) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "delete",
        url: `${process.env.REACT_APP_API_URL}/api/message/` + postId,
        withCredentials: true,
      });
      dispatch({
        type: DELETE_POST,
        payload: { postId },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteMediaMessage = (postId, media) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "patch",
        url: `${process.env.REACT_APP_API_URL}/api/message/` + postId,
        withCredentials: true,
        data: media,
      });
      dispatch({
        type: DELETE_MEDIA,
        payload: { media, postId },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const addPost = (data) => {
  return (dispatch) => {
    return axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/api/message/`,
      withCredentials: true,
      data: data,
    })
      .then((res) => {
        dispatch({ type: ADD_POST, payload: res.data });
      })
      .catch((error) => console.log(error));
  };
};

// likes

export const likePost = (postId, userId) => {
  return async (dispatch) => {
    return await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/api/message/like/${postId}`,
      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: LIKE_POST, payload: { postId, userId } });
      })
      .catch((error) => console.log(error));
  };
};

export const unlikePost = (postId, userId) => {
  return async (dispatch) => {
    return await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/api/message/unlike/${postId}`,
      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: UNLIKE_POST, payload: { postId, userId } });
      })
      .catch((error) => console.log(error));
  };
};
