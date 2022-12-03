import axios from "axios";

export const GET_FORMATIONS = "GET_FORMATIONS";
export const CREAT_FORMATIONS = "CREAT_FORMATIONS";
export const DELETE_FORMATION = "DELETE_FORMATION";

export const getFormations = () => {
  return (dispatch) => {
    return axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/api/formation/all/`,
      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: GET_FORMATIONS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const createFormation = (
  formationName,
  formationLvl,
) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/api/formation/`,
        withCredentials: true,
        data: {
          formationName: formationName,
          formationLvl: formationLvl,
        },
      });

      dispatch({
        type: CREAT_FORMATIONS,
        payload: { formationName, formationLvl },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteFormation = (formationsId) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}/api/formation/${formationsId}`,
      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: DELETE_FORMATION, payload: { formationsId } });
      })
      .catch((error) => console.log(error));
  };
};
