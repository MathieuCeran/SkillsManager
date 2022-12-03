import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
    getUsersFormations,
    deleteUserFormation,
} from "../../actions/usersFormation.actions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeleteUserFormation = ({ formations }) => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const handleDelete = (e) => {
        dispatch(deleteUserFormation(formations.id)).then(() =>
            dispatch(getUsersFormations(id))
        )
            .then(() =>
                toast.success(`La formation de l'utilisateur est supprimée`),
            );
    };

    useEffect(() => {
        dispatch(getUsersFormations(id));
    }, [dispatch, id]);

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

export default DeleteUserFormation;
