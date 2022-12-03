import React, { useState } from 'react';
import { getRequestFormation, editRequestFormation } from "../../actions/requestFormation.actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from 'react-redux';

const RequestFormationStatus = (formation) => {
    const [formationStatus, setFormationStatus] = useState("");
    const dispatch = useDispatch();

    const formationId = formation.formationId

    function colorSelect(e) {
        e.preventDefault();
        if (formationStatus) {
            try {
                dispatch(editRequestFormation(formationId, formationStatus))
                    .then(() => dispatch(getRequestFormation()),
                        toast.success("Mise à jour"))
            } catch (error) {
                console.log(error);
            }
        }

        // document.querySelector(".requestformation_container").style.background = "red";
    }

    return (
        <>
            <ToastContainer />
            <form className='formStatus' onSubmit={colorSelect}>
                <select className='tessst' name="color-select" id="color-select" onChange={(e) => setFormationStatus(e.target.value)} >
                    <option value="">Modifier le statut...</option>
                    <option value="0">🔔 A traiter...</option>
                    <option value="1">📆 Planifié</option>
                    <option value="2">✅ Terminé</option>
                    <option value="3" >❌ Annulé</option>
                </select>
                <input type="submit" className="test" value="Modifier" />
            </form>
        </>
    );
};

export default RequestFormationStatus;