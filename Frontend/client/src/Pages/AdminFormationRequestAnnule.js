import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Nav from "../Components/Nav/Nav";
import Login from "./Login";
import { Link } from "react-router-dom";
import { getRequestFormation } from "../actions/requestFormation.actions";
import RequestFormationStatus from "../Components/Formation/RequestFormationStatus";
import { DateParser } from "../Components/utils/Utils";
import DeleteRequest from "../Components/Formation/DeleteRequest";

const AdminFormationRequestAnnule = () => {
  const userData = useSelector((state) => state.userReducer);
  const requestData = useSelector((state) => state.requestFormationReducer);
  const dispatch = useDispatch();

  const requestFormations = Object.values(requestData).filter((formation) => {
    return formation.formationStatus === "3";
  });

  const request = Object.values(requestData).filter((formation) => {
    return formation.formationStatus === "0";
  });

  const rows = request.length;

  useEffect(() => {
    dispatch(getRequestFormation());
  }, []);

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
                <div className="requestformation">
                  <>
                    <div className="sous_menu">
                      <Link to={"/requestFormation"}>
                        <p>A traiter </p>
                      </Link>
                      <Link to={"/planifie"}>
                        <p>Planifiée </p>
                      </Link>
                      <Link to={"/termine"}>
                        <p>Terminée </p>
                      </Link>
                      <Link to={"/annule"}>
                        <p>Annulée </p>
                      </Link>
                    </div>

                    {requestFormations.map((request) => {
                      return (
                        <div
                          className="requestformation_container"
                          key={request.id}
                        >
                          <div className="resquestformation_body">
                            <p>
                              Formation :{" "}
                              <span className="formaName">
                                {request.Formation.formationName} -{" "}
                                {request.Formation.formationLvl}
                              </span>{" "}
                            </p>
                          </div>
                          <div className="resquestformation_body">
                            <p>
                              Pour :{" "}
                              <span className="formaName">
                                {request.user.firstname} {request.user.name}
                              </span>
                            </p>
                          </div>
                          <div className="resquestformation_body">
                            <RequestFormationStatus
                              formation={request}
                              formationId={request.id}
                            />
                          </div>
                          <div className="requestformation_date">
                            <p>Date souhaitée :</p>
                            <p>
                              <span className="formaName">
                                {" "}
                                {DateParser(request.formationDate)}{" "}
                              </span>
                            </p>
                          </div>
                          <div className="progress_formation">
                            <DeleteRequest formations={request} />
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

export default AdminFormationRequestAnnule;
