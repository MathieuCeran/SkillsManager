import axios from "axios";
export const GET_LIKE = "GET_LIKE";

///////Like
export const getLikes = () => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/api/message/like/all`,
        withCredentials: true,
      });
      dispatch({
        type: GET_LIKE,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
