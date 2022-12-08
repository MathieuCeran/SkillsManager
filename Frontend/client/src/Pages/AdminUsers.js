import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Nav from "../Components/Nav/Nav";
import Login from "./Login";
import { isEmpty } from "../Components/utils/Utils";
import { Link } from "react-router-dom";
import { getRequestFormation } from "../actions/requestFormation.actions";

const AdminUsers = () => {
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const requestData = useSelector((state) => state.requestFormationReducer);
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const searchToggle = () => {
    const toggleSearch = document.querySelector(".userlist_admin");
    toggleSearch.classList.toggle("active");
  };

  const requestFormations = Object.values(requestData).filter((formation) => {
    return formation.formationStatus === "0";
  });

  const rows = requestFormations.length;

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
                  <Link to={"/adminUsers"}>Gerer les utilisateurs</Link>
                </ul>
                <ul className="li">
                  <i className="far fa-plus-square"></i>
                  <Link to={"/formation"}>Gerer les formations</Link>
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
              <Link to={"/signup"}>
                <button className="create_user">Créer un utilisateur</button>
              </Link>
              <div className="search_admin">
                <input
                  type="text"
                  placeholder=" Rechercher un utilisateur"
                  className="searchbar_admin"
                  onChange={(e) => setQuery(e.target.value)}
                  onClick={searchToggle}
                />
                <ul className="useronline-container-admin userlist_admin">
                  <>
                    {!isEmpty(usersData[0]) &&
                      usersData
                        .filter((users) =>
                          users.firstname.toLowerCase().includes(query)
                        )
                        .slice(0, 5)
                        .map((users) => {
                          return (
                            <Link
                              to={{ pathname: `/formationAssign/${users.id}` }}
                              key={users.id}
                            >
                              <div className="user-online">
                                <div className="left-side">
                                  <div>
                                    {users.media && (
                                      <img src={users.media} alt="" />
                                    )}
                                  </div>
                                </div>
                                <div className="right-side">
                                  <span>
                                    {users.firstname} {users.name}
                                  </span>
                                  <span className="service">
                                    {users.service}
                                  </span>
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                  </>
                </ul>
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

export default AdminUsers;
