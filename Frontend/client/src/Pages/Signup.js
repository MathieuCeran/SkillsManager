import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SignupForm from "../Components/Log/SignupForm";
import Nav from "../Components/Nav/Nav";
import Login from "./Login";

const Signup = () => {
  const userData = useSelector((state) => state.userReducer);
  const requestData = useSelector((state) => state.requestFormationReducer);

  const requestFormations = Object.values(requestData).filter((formation) => {
    return formation.formationStatus === "0";
  });

  const rows = requestFormations.length;
  return (
    <>
      {userData.isAdmin ? (
        <>
          <Nav />
          <div className="mainContainer">
            <div className="leftBlock">
              <div className="left_menu">
                <ul className="li">
                  <i className="fa-regular fa-address-card"></i>
                  <Link to={"/adminUsers"}>Gerer les utilisateurs</Link>
                </ul>
                <ul className="li">
                  <i className="far fa-plus-square"></i>
                  <Link to={"/formation"}>Gerer les formations</Link>
                </ul>
                <ul className="li">
                  <i className="fa-brands fa-stack-overflow"></i>
                  <Link to={"/requestFormation"}>
                    Demandes de formations{" "}
                    <span className="numberRow">{rows}</span>
                  </Link>
                </ul>
                <ul className="li">
                  <i className="far fa-chart-bar"></i>
                  <Link to={"/alluserformation"}>Statistiques</Link>
                </ul>
              </div>
            </div>
            <div className="centerBlock_admin">
              <div className="useronline-container-admin">
                <div className="requestformation">
                  <>
                    <h2>Créer un utilisateur </h2>
                    <br />
                    <br />
                    <SignupForm />
                  </>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Login />
      )}
    </>
  );
};

export default Signup;
