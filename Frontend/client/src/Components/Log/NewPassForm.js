import React, { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useParams } from 'react-router-dom';

const NewPassForm = () => {

    const [password, setPassword] = useState("");
    const { token } = useParams();

    console.log(token);

    const handleLogin = (e) => {
        e.preventDefault();

        axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}/api/user/new-password`,
            withCredentials: true,
            data: {
                password,
                token
            },
        })
            .then((result) => {
                console.log(result.data);
            })
            .catch(() => toast.error("Merci de verifier vos identifiants"));
    };

    return (
        <>
            <ToastContainer />
            <form action="" onSubmit={handleLogin} id="form_signup">
                <label htmlFor="password">Votre nouveau Mot de passe</label>
                <input
                    type="password"
                    name="password"
                    className="input_signup"
                    id="password"
                    placeholder="Entrez votre mot de passe"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                />
                <div className="password-error"></div>
                <br />
                <input type="submit" className="submit" value="Modifier" />
            </form>
        </>
    );
};

export default NewPassForm;