import React from "react";
import ProfilEfitForm from "./ProfilEfitForm";

//Menu toggle
const menuToggle1 = () => {
  const toggleMenu = document.querySelector(".profil_menu_edit");
  toggleMenu.classList.toggle("active_edit");
};

const UpdateProfil = () => {
  return (
    <div className="action_edit">
      <div className="profil_buttons_edit">
        <button className="editButton" onClick={menuToggle1}>
          Editer mon profil
        </button>
      </div>
      <div className="profil_menu_edit">
        <ProfilEfitForm />
      </div>
    </div>
  );
};

export default UpdateProfil;
