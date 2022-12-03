import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Nav from "../Components/Nav/Nav";
import Login from "./Login";
import { Link, useParams } from "react-router-dom";
import { getFormations } from "../actions/formations.actions";
import { getUsersFormations } from "../actions/usersFormation.actions";
import CompetenceAssign from "../Components/Formation/CompetenceAssign";
import { isEmpty } from "../Components/utils/Utils";
import DeleteUserFormation from "../Components/Formation/DeleteUserFormation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const FormationAssign = () => {
  const [isLoading, setIsLoading] = useState(true);
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const { id } = useParams();
  const dispatch = useDispatch();
  const usersFormationsData = useSelector((state) => state.usersformationsReducer);

  const formations = Object.values(usersFormationsData).filter((formation) => {
    return formation.Formation;
  });



  const users = Object.values(usersData).filter((users) => { return users.id + "" === id; });

  useEffect(() => {
    dispatch(getUsersFormations(id));
    dispatch(getFormations());
    !isEmpty(userData) && setIsLoading(false);
  }, [dispatch, id, userData]);


  return (
    <>
      {userData.isAdmin ? (
        <>
          <ToastContainer />
          <Nav />
          <div className="mainContainer">
            <div className="leftBlock">
              <div className="left_menu">
                <ul className="li">
                  <i className="fa-regular fa-address-card"></i>
                  <Link to={"/adminUsers"}>Gerer les utilisateurs</Link>
                </ul>
                <ul className="li">
                  <i className="far fa-plus-square"></i>
                  <Link to={"/formation"}>Gerer les formations</Link>
                </ul>
                <ul className="li">
                  <i className="fa-brands fa-stack-overflow"></i>
                  <Link to={"/requestFormation"}>Demandes de formations</Link>
                </ul>
              </div>
            </div>
            <div className="centerBlock_admin">
              <div className="useronline-container-admin">
                <div className="formation_create">
                  <p>Les formations aquises de : {users[0].name} {users[0].firstname}</p>
                  {isLoading ? (
                    <div className="chargement">
                      <i className="fas fa-spinner fa-spin"></i>
                      <span>CHARGEMENT</span>
                    </div>
                  ) : (
                    <div className="formation_aquise">
                      {isLoading ? (
                        <div className="chargement">
                          <i className="fas fa-spinner fa-spin"></i>
                          <span>CHARGEMENT</span>
                        </div>
                      ) : (
                        <div className="formation_aquise">
                          {formations.map((formations) => {
                            return (
                              <div
                                className="formation_container" key={formations.id}
                              >
                                <div className="formation_body">
                                  <p>Formation : {formations.Formation.formationName}</p>
                                </div>
                                <div className="formation_lvl">
                                  <p>{formations.Formation.formationLvl}</p>
                                </div>
                                <div className="progress_formation">
                                  <p>Taux de réussite : {formations.formationPercent}%</p>
                                  <progress
                                    className="progress is-danger"
                                    value={formations.formationPercent}
                                    max="100"
                                  ></progress>
                                  <DeleteUserFormation formations={formations} />
                                </div>
                                <div className="formation_container_footer_admin">
                                  <p>Formateur : {formations.formationFormateur}</p>
                                  <p>Date : {formations.formationDate}</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>)}
                    </div>)}
                </div>
                <div className="formation_create">
                  <p>Assigner une formation à l'utilisateur : {users[0].name} {users[0].firstname}</p>
                  <CompetenceAssign />
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

export default FormationAssign;
