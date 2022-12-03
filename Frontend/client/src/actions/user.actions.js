import axios from "axios";

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const PROFIL_EDIT = "PROFIL_EDIT";

export const getUser = (uid) => {
  return async (dispatch) => {
    return await axios
      .get(`${process.env.REACT_APP_API_URL}/api/user/${uid}`, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((error) => console.log(error));
  };
};

export const uploadPicture = (data, id) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "put",
        url: `${process.env.REACT_APP_API_URL}/api/user/avatar/${id}`,
        withCredentials: true,
        data: data,
        headers: { "Content-Type": "multipart/form-data" },
      });

      dispatch({
        type: UPLOAD_PICTURE,
        payload: res.data.media,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateProfil = (
  userId,
  firstname,
  name,
  email,
  password,
  service,
  coach
) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/api/user/${userId}`,
        withCredentials: true,

        data: { firstname, name, email, password, service, coach },
      });

      dispatch({
        type: PROFIL_EDIT,
        payload: { firstname, name, email, password, service, coach },
      });
    } catch (error) {
      console.log(error);
    }
  };
};
