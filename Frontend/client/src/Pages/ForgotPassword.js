import React from 'react';
import ForgotPass from '../Components/Log/ForgotPass';
import Logo from '../Components/Logo/Logo';

const ForgotPassword = () => {
    return (
        <div className="loginpage">
            <div className="circle">
                <div className="circle-small pulsate-bck"></div>
                <div className="circle-medium pulsate-bck"></div>
                <div className="circle-large pulsate-bck"></div>
                <div className="circle-xlarge pulsate-bck"></div>
            </div>
            <div className="container">
                <div className="container_left">
                    <p>Bienvenue chez</p>
                    <Logo />
                </div>
                <div className="container_right">
                    <div className="login_form">
                        <h1>Mot de passe oublié</h1>
                        <p>
                            Entrez votre mail pour modifier votre mot de passe
                        </p>
                        <div className="login_form_formulaire">
                            <ForgotPass />
                        </div>
                        <div className="login_form-signup">
                            <p>Vous avez déjà un compte ?</p>
                            <a href="/login">Connexion</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;