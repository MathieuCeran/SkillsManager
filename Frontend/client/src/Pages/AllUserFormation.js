import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Nav from "../Components/Nav/Nav";
import Login from "./Login";
import { Link } from "react-router-dom";
import { getAllUsersFormation } from "../actions/usersFormation.actions";
import { isEmpty } from "../Components/utils/Utils";
import { CSVLink } from "react-csv";

const AllUserFormation = () => {
  const userData = useSelector((state) => state.userReducer);
  const FormationsData = useSelector((state) => state.usersformationsReducer);
  const dispatch = useDispatch();

  const dataFormations = Object.values(FormationsData).filter((formation) => {
    return formation;
  });

  const headers = [
    { label: "Nom", key: "Nom" },
    { label: "Prenom", key: "Prenom" },
    { label: "Formation", key: "Formation" },
    { label: "Niveau", key: "Niveau" },
    { label: "Date", key: "Date" },
    { label: "Formateur", key: "Formateur" },
  ];

  let data = [];

  dataFormations.forEach((users) => {
    data.push({
      Nom: users.user.name,
      Prenom: users.user.firstname,
      Formation: users.Formation.formationName,
      Niveau: users.Formation.formationLvl,
      Date: users.formationDate,
      Formateur: users.formationFormateur,
    });
  });

  useEffect(() => {
    dispatch(getAllUsersFormation());
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
                <ul className="li">
                  <i className="far fa-chart-bar"></i>
                  <Link to={"/alluserformation"}>Statistiques</Link>
                </ul>
              </div>
            </div>
            <div className="centerBlock_admin">
              <h1>Utilisateurs Formés</h1>
              <div className="telecharger">
                <CSVLink
                  data={data}
                  headers={headers}
                  filename={"skillsManager-export.csv"}
                >
                  Télécharger en CSV
                </CSVLink>
              </div>
              <table id="table-to-xls">
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Formation</th>
                    <th>Niveau</th>
                    <th>Date</th>
                    <th>Formateur</th>
                  </tr>
                </thead>
                <tbody>
                  {!isEmpty(dataFormations[0]) &&
                    dataFormations.map((users) => {
                      return (
                        <tr key={users.id}>
                          <td>{users.user.name}</td>
                          <td>{users.user.firstname}</td>
                          <td>{users.Formation.formationName}</td>
                          <td>{users.Formation.formationLvl}</td>
                          <td>{users.formationDate}</td>
                          <td>{users.formationFormateur}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <Login />
      )}
    </>
  );
};

export default AllUserFormation;
