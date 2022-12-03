import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRequestFormation,
  creatRequestFormation,
} from "../../actions/requestFormation.actions";
import { getFormations } from "../../actions/formations.actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RequestFormation = () => {
  const [formationName, setformationName] = useState("");
  const [formationDate, setformationDate] = useState("");
  const [usersId, setuserId] = useState("");

  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);

  const FormationsData = useSelector((state) => state.formationsReducer);
  const dispatch = useDispatch();

  const allFormations = Object.values(FormationsData).filter((formation) => {
    return formation;
  });

  const allUsers = Object.values(usersData).filter((users) => {
    return users;
  });

  const toggleFormation = () => {
    const toggleMenu = document.querySelector(".profil_menu_edit");
    toggleMenu.classList.toggle("active_edit");
  };

  const handleRequestForm = (e) => {
    e.preventDefault();
    if (formationName && formationDate) {
      dispatch(
        creatRequestFormation(usersId, formationName, formationDate)
      ).then(() => toast.success("La demande est envoyée"));
    }
  };

  useEffect(() => {
    dispatch(getRequestFormation());
    dispatch(getFormations());
  }, [userData]);

  let formation = [];
  let userComplete = [];

  return (
    <>
      <ToastContainer />
      {userData.isCoach ? (
        <div className="action_request">
          <div className="profil_buttons_edit">
            <div className="admin">
              <div className="coach__button" onClick={toggleFormation}>
                <span> Demande de formation</span>
              </div>
            </div>
          </div>
          <div className="profil_menu_edit">
            <form action="" onSubmit={handleRequestForm}>
              <label htmlFor="formationName">Nom de la formation</label>
              <select
                name="formationName"
                id="formationName"
                onChange={(e) => setformationName(e.target.value)}
              >
                <option value="">--Voir la liste des formations--</option>
                {allFormations.map((formations) => {
                  return (
                    (formation =
                      formations.formationName +
                      " - " +
                      formations.formationLvl),
                    (
                      <option value={formations.id} key={formations.id}>
                        {formation}
                      </option>
                    )
                  );
                })}
              </select>
              <br />

              <label htmlFor="DateFormation">Date souhaitée</label>
              <input
                type="datetime-local"
                name="DateFormation"
                className="input_signup"
                id="DateFormation"
                onChange={(e) => setformationDate(e.target.value)}
                required
              />
              <br />
              <label htmlFor="formationUser">Utilisateur à former</label>
              <select
                name="userId"
                id="userId"
                onChange={(e) => setuserId(e.target.value)}
              >
                <option value="">--Voir la liste des utilisateurs--</option>
                {allUsers.map((user) => {
                  return (
                    (userComplete = user.firstname + " - " + user.name),
                    (
                      <option value={user.id} key={user.id}>
                        {userComplete}
                      </option>
                    )
                  );
                })}
              </select>
              <br />

              <input
                type="submit"
                className="submit"
                value="Demander une formation"
              />
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default RequestFormation;
