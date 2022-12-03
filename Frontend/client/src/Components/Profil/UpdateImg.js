import React from "react";
import UpdateImgForm from "./UpdateImgForm";

const menuToggle = () => {
  const toggleMenu = document.querySelector(".profil_menu_edit_media");
  toggleMenu.classList.toggle("active_edit_media");
};

const UpdateImg = () => {
  return (
    <div className="action_edit_media">
      <div className="profil_buttons_edit_media">
        <button className="editProfilMedia" onClick={menuToggle}>
          +
        </button>
      </div>
      <div className="profil_menu_edit_media">
        <UpdateImgForm />
      </div>
    </div>
  );
};

export default UpdateImg;
