import { useSelector } from "react-redux";
import Nav from "../Components/Nav/Nav";
import { UidContext } from "../Components/App.Context";
import { Link } from "react-router-dom";
import Thread from "../Components/Thread";
import NewPostForm from "../Components/Post/NewPostForm";
import { useContext } from "react";
import Login from "./Login";
import Trending from "./Trending";
import RequestFormation from "../Components/Formation/RequestFormation";

const Home = () => {
  const userData = useSelector((state) => state.userReducer);
  const uid = useContext(UidContext);

  return (
    <>
      {uid ? (
        <>
          <Nav />
          <div className="mainContainer">
            <div className="leftBlock">
              <div className="left_Profil">
                <div className="profil_picture">
                  <img src={userData.media} alt="" />
                </div>
                <div className="profil_infos">
                  <span>
                    {userData.firstname} {userData.name}
                  </span>{" "}
                  <br />
                  <p>@{userData.service}</p>
                </div>
              </div>
              <div className="left_menu">
                <ul className="li">
                  <i className="fa-solid fa-house"></i>
                  <Link to={`/home`}>Fil d'actualités</Link>
                </ul>
                <ul className="li">
                  <i className="fa-regular fa-address-card"></i>
                  <Link to={`/userprofil/${userData.id}`}>Mon Profil</Link>
                </ul>
                <ul className="li">
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>
                  <Link to={`/logout`}>Déconnexion</Link>
                </ul>
                {userData.isAdmin ? (
                  <div className="admin">
                    <div className="admin__button">
                      <Link to={`/adminUsers`}> Administration</Link>
                    </div>
                  </div>
                ) : null}
                {userData.isCoach ? (
                  <RequestFormation />
                ) : null}
              </div>
            </div>
            <div className="centerBlock">
              {userData.isAdmin ? <NewPostForm /> : null}
              <Thread />
            </div>
            <div className="rightBlock">
              <div className="right-block-container">
                <Trending />
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

export default Home;
