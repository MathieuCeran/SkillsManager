import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Nav from "../Components/Nav/Nav";
import Login from "./Login";
import { Link } from "react-router-dom";
import { getFormations } from "../actions/formations.actions";
import { getUsersFormations } from "../actions/usersFormation.actions";
import CreateFormation from "../Components/Formation/CreateFormation";
import DeleteFormation from "../Components/Formation/DeleteFormation";
import { getRequestFormation } from "../actions/requestFormation.actions";

const Formation = () => {
  const userData = useSelector((state) => state.userReducer);
  const formationsData = useSelector((state) => state.formationsReducer);
  const requestData = useSelector((state) => state.requestFormationReducer);
  const requestFormations = Object.values(requestData).filter((formation) => {
    return formation.formationStatus === "0";
  });

  const rows = requestFormations.length;

  const formations = Object.values(formationsData).filter((formation) => {
    return formation;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFormations());
    dispatch(getUsersFormations());
    dispatch(getRequestFormation());
  }, [userData]);

  return (
    <>
      {userData.isAdmin ? (
        <>
          <Nav />
          <div className="mainContainer">
            <div className="leftBlock">
              <div className="left_menu">
                <ul className="li">
                  <i className="fa-regular fa-address-card"></i>
                  <Link to={"/adminUsers"}>Gérer les utilisateurs</Link>
                </ul>
                <ul className="li">
                  <i className="far fa-plus-square"></i>
                  <Link to={"/formation"}>Gérer les formations</Link>
                </ul>
                <ul className="li">
                  <i className="fa-brands fa-stack-overflow"></i>
                  <Link to={"/requestFormation"}>
                    Demandes de formations{" "}
                    <span className="numberRow">{rows}</span>
                  </Link>
                </ul>
                <ul className="li">
                  <i className="far fa-chart-bar"></i>
                  <Link to={"/alluserformation"}>Statistiques</Link>
                </ul>
              </div>
            </div>
            <div className="centerBlock_admin">
              <div className="useronline-container-admin">
                <div className="formation_create">
                  <p>Créer une nouvelle formation : </p>
                  <CreateFormation />
                </div>
                <div className="formation">
                  <>
                    {formations.map((formations) => {
                      return (
                        <div
                          className="formation_container"
                          key={formations.id}
                        >
                          <div className="formation_body">
                            <p>Formation : {formations.formationName}</p>
                          </div>
                          <div className="formation_lvl">
                            <p>
                              <i className="fa-solid fa-layer-group"></i>{" "}
                              {formations.formationLvl}
                            </p>
                            <i className="fas fa-trophy"></i>
                          </div>
                          <div className="progress_formation">
                            {/* <progress
                              className="progress is-danger"
                              value={formations.formationPercent}
                              max="100"
                            ></progress> */}
                            <DeleteFormation formations={formations} />
                          </div>
                        </div>
                      );
                    })}
                  </>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Login />
      )}
    </>
  );
};

export default Formation;
