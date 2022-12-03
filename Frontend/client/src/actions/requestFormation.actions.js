import axios from "axios";


export const GET_REQUESTFORMATION = "GET_REQUESTFORMATION";
export const CREAT_REQUESTFORMATION = "CREAT_REQUESTFORMATION";
export const EDIT_REQUESTFORMATION = "EDIT_REQUESTFORMATION";
export const EDIT_REQUESTSUBFORMATION = "EDIT_REQUESTSUBFORMATION";
export const DELETE_REQUESTFORMATIONS = "DELETE_REQUESTFORMATIONS";


export const getRequestFormation = () => {
  return (dispatch) => {
    return axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/api/formation/requestFormation/`,
      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: GET_REQUESTFORMATION, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};


export const creatRequestFormation = (usersId, formationName, formationDate) => {
  return (dispatch) => {
    return axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/api/formation/requestFormation/`,
      withCredentials: true,
      data: { usersId, formationName, formationDate }
    })
      .then((res) => {
        dispatch({ type: CREAT_REQUESTFORMATION, payload: { usersId, formationName, formationDate } });
      })
      .catch((err) => console.log(err));
  };
};


export const editRequestFormation = (formationId, formationStatus) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}/api/formation/requestFormation/${formationId}`,
      withCredentials: true,
      data: { formationStatus: formationStatus }
    })
      .then((res) => {
        dispatch({ type: EDIT_REQUESTFORMATION, payload: { formationId, formationStatus } });
      })
      .catch((err) => console.log(err));
  };
};

//Modifie le status une fois la formation assigner
export const editSubRequestFormation = (subformationId, formationStatus) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}/api/formation/requestFormation/${subformationId}`,
      withCredentials: true,
      data: { formationStatus: formationStatus }
    })
      .then((res) => {
        dispatch({ type: EDIT_REQUESTSUBFORMATION, payload: { subformationId, formationStatus } });
      })
      .catch((err) => console.log(err));
  };
};


export const deleteRequestFormation = (formationsId) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}/api/formation/requestFormation/${formationsId}`,
      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: DELETE_REQUESTFORMATIONS, payload: { formationsId } });
      })
      .catch((error) => console.log(error));
  };
};

