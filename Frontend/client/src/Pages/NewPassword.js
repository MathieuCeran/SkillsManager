import Logo from "../Components/Logo/Logo";
import NewPassForm from "../Components/Log/NewPassForm";

const NewPassword = () => {
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
                        <h1>Modifier votre mot de passe</h1>
                        <p>
                            Vous pouvez maintenant modifier votre mot de passe, pour accèder a SkillsManager
                        </p>
                        <div className="login_form_formulaire">
                            <NewPassForm />
                        </div>
                        <div className="login_form-signup">
                            <p>Me connecter ?</p>
                            <a href="/login">Connexion</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewPassword;
