import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getUser, uploadPicture } from "../../actions/user.actions";
import { getUsers } from "../../actions/users.actions";

const menuToggle = () => {
  const toggleMenu = document.querySelector(".profil_menu_edit_media");
  toggleMenu.classList.toggle("active_edit_media");
};

const UpdateImgForm = () => {
  const [file, setFile] = React.useState(null);
  const dispatch = useDispatch();
  const { id } = useParams();
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);

  const userId = Object.values(usersData).filter((user) => {
    return user.id + "" === id;
  });

  const handlePicture = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("media", file);
    data.append("id", userId[0].id);

    dispatch(uploadPicture(data, userId[0].id)).then(() =>
      window.location.reload()
    );

    setFile(false);
  };

  return (
    <>
      <form action="" className="input_media" onSubmit={handlePicture}>
        <label htmlFor="file">Changer votre photo de profil</label>
        <br />
        <input
          type="file"
          name="media"
          onChange={(e) => setFile(e.target.files[0])}
          accept=".jpg, .jpeg, .png, .gif"
        />

        <br />
        <input
          type="submit"
          className="submit"
          value="Envoyer"
          onClick={menuToggle}
        />
      </form>
    </>
  );
};

export default UpdateImgForm;
