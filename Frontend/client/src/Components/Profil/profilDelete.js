import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Cookie from "js-cookie";
import { UidContext } from "../App.Context";
import { useSelector } from "react-redux";

const ProfilDelete = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const { id } = useParams();
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);

  useEffect(() => {
    const checkAdmin = () => {
      if (uid === userData.id && userData.isAdmin) {
        setIsAdmin(true);
      }
    };
    checkAdmin();
  }, [userData]);

  const removeCookie = (key) => {
    if (window === undefined) Cookie.remove(key, { expires: 1 });
  };

  const handleDeleteForm = async () => {
    await axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}/api/user/` + id,
      withCredentials: true,
    })
      .then(() => {
        removeCookie("jwt");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {isAdmin || uid + "" === id ? (
        <form
          action=""
          className="input_media"
          onSubmit={() => {
            if (window.confirm("Voulez-vous supprimer le compte ?")) {
              handleDeleteForm();
            }
          }}
        >
          <br />
          <input type="submit" className="submit" value="Supprimer le compte" />
        </form>
      ) : null}
    </>
  );
};

export default ProfilDelete;
