import axios from "axios";

export const GET_USERSFORMATIONS = "GET_USERSFORMATIONS";
export const GET_ALLUSERSFORMATIONS = "GET_ALLUSERSFORMATIONS";
export const CREAT_USERSFORMATIONS = "CREAT_USERSFORMATIONS";
export const DELETE_USERSFORMATIONS = "DELETE_USERSFORMATIONS";

export const getUsersFormations = (userId) => {
  return (dispatch) => {
    return axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/api/user/formation/${userId}`,
      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: GET_USERSFORMATIONS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const getAllUsersFormation = () => {
  return (dispatch) => {
    return axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/api/user/formation/stats/all`,
      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: GET_ALLUSERSFORMATIONS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const creatUsersFormations = (
  userId,
  formationId,
  formationPercent,
  formationDate,
  formationFormateur
) => {
  return (dispatch) => {
    return axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/api/formation/formationAssign/${userId}`,
      withCredentials: true,
      data: {
        formationId,
        formationPercent,
        formationDate,
        formationFormateur,
      },
    })
      .then((res) => {
        dispatch({
          type: CREAT_USERSFORMATIONS,
          payload: {
            formationId,
            formationPercent,
            formationDate,
            formationFormateur,
          },
        });
      })
      .catch((err) => console.log(err));
  };
};

export const deleteUserFormation = (formationsId) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}/api/formation/formationAssign/${formationsId}`,
      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: DELETE_USERSFORMATIONS, payload: { formationsId } });
      })
      .catch((error) => console.log(error));
  };
};
