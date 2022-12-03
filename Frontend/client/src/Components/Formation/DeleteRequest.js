import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
    getRequestFormation,
    deleteRequestFormation,
} from "../../actions/requestFormation.actions";

const DeleteRequest = ({ formations }) => {

    const dispatch = useDispatch();

    const handleDelete = (e) => {
        dispatch(deleteRequestFormation(formations.id)).then(() =>
            dispatch(getRequestFormation())
        );
        console.log("Formation supprimée");
    };

    useEffect(() => {
        dispatch(getRequestFormation());
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

export default DeleteRequest;