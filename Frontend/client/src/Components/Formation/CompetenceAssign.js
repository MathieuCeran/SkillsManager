import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getFormations,
} from "../../actions/formations.actions";
import { creatUsersFormations, getUsersFormations, } from "../../actions/usersFormation.actions";

const CompetenceAssign = () => {
  const [formationId, setformationId] = useState("");
  const [formationPercent, setformationPercent] = useState("");
  const [formationDate, setformationDate] = useState("");
  const [formationFormateur, setformationFormateur] = useState("");
  const { id } = useParams();
  const userId = id

  const usersFormationsData = useSelector((state) => state.formationsReducer);
  const dispatch = useDispatch();

  const allFormations = Object.values(usersFormationsData).filter((formation) => {
    return formation;
  });


  const handleCreateForm = (e) => {
    e.preventDefault();
    if (formationId) {
      dispatch(
        creatUsersFormations(userId, formationId, formationPercent, formationDate, formationFormateur)
      ).then(() =>
        window.location.reload()
      );
    }
  };

  useEffect(() => {
    dispatch(getFormations());
    dispatch(getUsersFormations(id));
  }, []);

  return (
    <>
      <form action="" onSubmit={handleCreateForm}>
        <label htmlFor="formationId">Nom de la formation</label>
        <select
          name="formationId"
          id="formationId"
          onChange={(e) => setformationId(e.target.value)}
        >
          <option value="">--Voir la liste des formations--</option>
          {allFormations.map((formations) => {
            return (
              <option value={formations.id} key={formations.id}>
                {formations.formationName} - {formations.formationLvl}
              </option>
            );
          })}
        </select>
        <br />

        <label htmlFor="formationPercent" >
          % de reussite de la formation (visible que pour les admins) {" "}
        </label>
        <input
          type="text"
          name="formationPercent"
          className="input_signup"
          id="formationPercent"
          placeholder="Exemple : 100%"
          onChange={(e) => setformationPercent(e.target.value)}
          value={formationPercent}
          required
        />
        <br />
        <label htmlFor="formationDate" >
          Date de la formation
        </label>
        <input
          type="date"
          name="formationDate"
          className="input_signup"
          id="formationDate"
          onChange={(e) => setformationDate(e.target.value)}
          value={formationDate}
          required
        />
        <br />
        <label htmlFor="formationFormateur" >
          Formateur
        </label>
        <input
          type="text"
          name="formationFormateur"
          className="input_signup"
          id="formationFormateur"
          onChange={(e) => setformationFormateur(e.target.value)}
          value={formationFormateur}
          required
        />
        <br />
        <input type="submit" className="submit" value="Assigner la formation" />
      </form>
    </>
  );
};

export default CompetenceAssign;
