import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createFormation,
  getFormations,
} from "../../actions/formations.actions";

const CreateFormation = () => {
  const [formationName, setformationName] = useState("");
  const [formationLvl, setformationLvl] = useState("");
  // const [formationPercent, setformationPercent] = useState("");
  // const [formationDate, setformationDate] = useState("");
  // const [formationFormateur, setformationFormateur] = useState("");
  const dispatch = useDispatch();

  const handleCreateForm = (e) => {
    e.preventDefault();
    if (formationName && formationLvl) {
      dispatch(
        createFormation(formationName, formationLvl)
      ).then(() => dispatch(getFormations()));
    }
  };

  useEffect(() => {
    dispatch(getFormations());
  }, []);

  return (
    <>
      <form action="" onSubmit={handleCreateForm}>
        <label htmlFor="formationName">Nom de la formation</label>
        <input
          type="text"
          name="formationName"
          className="input_signup"
          id="formationName"
          placeholder="Exemple: Transfert"
          onChange={(e) => setformationName(e.target.value)}
          value={formationName}
          required
        />
        <br />
        <label htmlFor="formationLvl">Niveau de la formation</label>
        <input
          type="text"
          name="formationLvl"
          className="input_signup"
          id="formationLvl"
          placeholder="Exemple : Niveau 1 ou Niveau 2/4"
          onChange={(e) => setformationLvl(e.target.value)}
          value={formationLvl}
          required
        />
        <br />
        {/* <label htmlFor="formationPercent" >
          % de reussite {" "}
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
        <br /> */}
        {/* <label htmlFor="formationDate" >
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
        <br /> */}
        
        <input type="submit" className="submit" value="Créer une formation" />
      </form>
    </>
  );
};

export default CreateFormation;
