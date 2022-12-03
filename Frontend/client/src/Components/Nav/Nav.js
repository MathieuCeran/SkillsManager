import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logo from "../../Components/Logo/Logo";
import Logout from "../Log/Logout";

const Nav = () => {
  const [query, setQuery] = useState("");

  const searchToggle = () => {
    const toggleSearch = document.querySelector(".userlist");
    toggleSearch.classList.toggle("active");
  };

  const userData = useSelector((state) => state.userReducer);

  const usersData = useSelector((state) => state.usersReducer);

  const menuToggle = () => {
    const toggleMenu = document.querySelector(".profil_menu");
    toggleMenu.classList.toggle("active");
  };

  return (
    <div className="Navheader">
      <div className="logo">
        <Logo />
      </div>
      <div className="search">
        <input
          type="text"
          placeholder=" Rechercher un utilisateur"
          className="searchbar"
          onChange={(e) => setQuery(e.target.value)}
          onClick={searchToggle}
        />
        <ul className="userlist">
          {usersData
            .filter((users) => users.firstname.toLowerCase().includes(query))
            .slice(0, 3)
            .map((users) => (
              <li className="liste" key={users.id}>
                <Link to={`/userprofil/${users.id}`} key={users.id}>
                  <div className="img">
                    <img src={users.media} alt="" />{" "}
                  </div>
                  <div className="name">
                    {" "}
                    {users.firstname} {users.name}
                  </div>
                </Link>
              </li>
            ))}
        </ul>
      </div>
      <div className="action">
        <div className="profil" onClick={menuToggle}>
          <img src={userData.media} alt="profil" />
        </div>

        <div className="profil_menu">
          <h3>
            {userData.firstname} {userData.name} <br />
            <span> {userData.service}</span>
          </h3>

          <ul>
            <li>
              <Link to={`/userprofil/${userData.id}`}>Mon profil</Link>
            </li>

            {userData.isAdmin ? (
              <li>
                <Link to={`/adminUsers`}>Administration</Link>
              </li>
            ) : null}

            <Logout />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Nav;
