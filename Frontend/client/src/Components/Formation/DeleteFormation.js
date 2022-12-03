import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getFormations,
  deleteFormation,
} from "../../actions/formations.actions";

const DeleteFormation = ({ formations }) => {
  const dispatch = useDispatch();

  const handleDelete = (e) => {
    dispatch(deleteFormation(formations.id)).then(() =>
      dispatch(getFormations())
    );
    console.log("Formation supprimée");
  };

  useEffect(() => {
    dispatch(getFormations());
  }, []);

  return (
    <i
      onClick={() => {
        if (window.confirm("Voulez-vous supprimer cette formation ?")) {
          handleDelete();
        }
      }}
      className="far fa-trash-alt poub"
    ></i>
  );
};

export default DeleteFormation;
