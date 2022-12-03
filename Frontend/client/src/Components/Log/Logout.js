import React from "react";
import axios from "axios";
import Cookie from "js-cookie";

const Logout = () => {
  const removeCookie = (key) => {
    if (window === undefined) Cookie.remove(key, { expires: 1 });
  };

  const logout = async () => {
    await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/api/user/logout`,
      withCredentials: true,
    })
      .then(() => removeCookie("jwt"))
      .catch((err) => console.log(err));
    window.location = "/";
  };

  return (
    <li>
      <a href="/logout" onClick={logout}>
        Déconnexion
      </a>
    </li>
  );
};

export default Logout;
