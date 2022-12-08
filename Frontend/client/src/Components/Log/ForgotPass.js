import React, { useState } from 'react';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




const ForgotPass = () => {

    const [email, setEmail] = useState("");
    const handleForgot = (e) => {
        e.preventDefault();

        axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}/api/user/reset-password`,
            withCredentials: true,
            data: {
                email,
            },
        })
            .then((result) => {
                toast.success("Merci de vérifier votre boite mail pour reinitialiser votre mot de passe ( vérifier aussi la boite SPAM )")
            })
            .catch(() => toast.error("Utilisateur inconnu"));
    }

    return (
        <>
            <ToastContainer />
            <form action="" onSubmit={handleForgot} id="form_signup">
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    name="email"
                    className="input_signup"
                    id="email"
                    placeholder="Entrez votre email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                />
                <div className="email-error"></div>
                <br />

                <input type="submit" className="submit" value="Modifier mon mot de passe" />
            </form>
        </>
    );
};

export default ForgotPass;