import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { creatUsersFormations } from "../../actions/usersFormation.actions";
import {
  getRequestFormation,
  editRequestFormation,
} from "../../actions/requestFormation.actions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AsignFormRequest = ({ request }) => {
  const [formationPercent, setformationPercent] = useState("");
  const [formationDate, setformationDate] = useState("");
  const [formationFormateur, setformationFormateur] = useState("");

  const userId = request.user.id;
  const formationId = request.Formation.id;
  const subformationId = request.id;
  const [formationStatus, setFormationStatus] = useState("2");

  const dispatch = useDispatch();

  const handleCreateForm = (e) => {
    e.preventDefault();
    dispatch(
      editRequestFormation(subformationId, formationStatus),
      creatUsersFormations(
        userId,
        formationId,
        formationPercent,
        formationDate,
        formationFormateur
      )
    );
    dispatch(
      creatUsersFormations(
        userId,
        formationId,
        formationPercent,
        formationDate,
        formationFormateur
      )
    ).then(
      () => dispatch(getRequestFormation()),
      toast.success(
        `La formation est maintenant assigné à ${request.user.firstname} ${request.user.name}`
      )
    );
  };

  return (
    <>
      <div className="accordion-content">
        <p>
          Valider la formation à :{" "}
          <span className="formaName">
            {request.user.firstname} {request.user.name}
          </span>
        </p>
        <div className="Requestformation_container">
          <form action="" onSubmit={handleCreateForm}>
            <label htmlFor="formationPercent">
              % de reussite de la formation (visible que pour les admins)
            </label>
            <input
              type="text"
              name="formationPercent"
              className="input_signup"
              id="formationPercent"
              placeholder="Exemple : 100%"
              required
              onChange={(e) => setformationPercent(e.target.value)}
            />
            <br />
            <label htmlFor="formationDate">Date de la formation</label>
            <input
              type="date"
              name="formationDate"
              className="input_signup"
              id="formationDate"
              onChange={(e) => setformationDate(e.target.value)}
              required
            />
            <br />
            <label htmlFor="formationFormateur">Formateur</label>
            <input
              type="text"
              name="formationFormateur"
              className="input_signup"
              id="formationFormateur"
              onChange={(e) => setformationFormateur(e.target.value)}
              required
            />
            <br />
            <input
              type="submit"
              className="submit"
              value="Assigner la formation"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default AsignFormRequest;
