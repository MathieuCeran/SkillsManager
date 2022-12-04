import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, getPosts } from "../../actions/post.actions";
import { DateParser, isEmpty } from "../utils/Utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Share from "../../Components/Logo/Share";

const NewPostForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [mediaFront, setMediaFront] = useState(null);
  const [video, setVideo] = useState(null);
  const [media, setMedia] = useState();
  const [status, setStatus] = useState();

  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handlePicture = (e) => {
    setMediaFront(URL.createObjectURL(e.target.files[0]));
    setMedia(e.target.files[0]);
    setVideo("");
  };

  const handlePost = async () => {
    if (!message) {
      toast.error("Veuillez entrer un message avant de poster");
    }
    if (message || mediaFront || video) {
      const data = new FormData();
      data.append("userId", userData.id);
      data.append("texte", message);
      data.append("status", status);
      if (media) data.append("media", media);
      if (video) data.append("video", video);

      await dispatch(addPost(data))
        .then(() => dispatch(getPosts()))
        .then(() => cancelPost());
    } else {
      toast.error("Veuillez entrer un message");
    }
  };

  const cancelPost = () => {
    setMessage("");
    setMediaFront("");
    setMedia("");
    setVideo("");
    dispatch(getPosts());
  };

  useEffect(() => {
    if (!isEmpty(userData)) setIsLoading(false);

    const handleVideo = () => {
      let findLink = message.split(" ");
      for (let i = 0; i < findLink.length; i++) {
        if (
          findLink[i].includes("https://www.yout") ||
          findLink[i].includes("https://yout")
        ) {
          let embed = findLink[i].replace("watch?v=", "embed/");
          setVideo(embed.split("&")[0]);
          findLink.splice(i, 1);
          setMessage(findLink.join(" "));
          setMediaFront("");
        }
      }
    };
    handleVideo();
  }, [userData, message, video]);

  console.log(status);

  return (
    <div className="post-container">
      <ToastContainer />
      {isLoading ? (
        <div className="chargement">
          <i className="fas fa-spinner fa-spin"></i>
          <span>CHARGEMENT</span>
        </div>
      ) : (
        <div className="post-container-inside">
          <div className="post-container-post">
            <div className="left-post-bloc">
              <div className="user-profil">
                <img src={userData.media} alt="profil_pic" />
              </div>
            </div>
            <div className="right-bloc">
              <div className="form-input">
                <div className="post-form">
                  <CKEditor
                    editor={Editor}
                    data={"Quoi de neuf, " + userData.firstname + " ?"}
                    onReady={(editor) => {
                      // You can store the "editor" and use when it is needed.
                      // console.log("Editor is ready to use!", editor);
                    }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setMessage(data);
                    }}
                    onBlur={(event, editor) => {}}
                    onFocus={(event, editor) => {}}
                  />
                  {/* <textarea
                    name="message"
                    id="message"
                    rows="3"
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    placeholder={"Quoi de neuf " + userData.firstname + " ?"}
                  /> */}
                </div>
                <div className="display-button">
                  <button className="post-message" onClick={handlePost}>
                    <Share />
                    Poster !
                  </button>
                  {message || mediaFront || video ? (
                    <button className="cancel" onClick={cancelPost}>
                      Annuler
                    </button>
                  ) : null}
                </div>
              </div>
              <div className="image-uplod">
                <div className="message-icon">
                  <i className="far fa-image"></i>
                  <span>Ajouter une image ?</span>
                  <input
                    type="file"
                    id="file-upload"
                    name="media"
                    accept=".jpg, .jpeg, .png"
                    onChange={(e) => handlePicture(e)}
                  />
                </div>
                <select
                  className="status_message"
                  name="color-select"
                  id="color-select"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">Par défaut</option>
                  <option value="1">🔔 Important</option>
                  <option value="2">✅ Résolu</option>
                </select>
              </div>
            </div>
          </div>
          {message || mediaFront || video ? (
            <li className="preview-container ping">
              <div className="preview-left">
                <img src={userData.media} alt="profil_pic" />
              </div>
              <div className="preview-header">
                <h3 className="name">
                  {userData.firstname + " " + userData.name}
                </h3>
                <span className="service">{userData.service}</span> <br />
                <span className="date">{DateParser(new Date(Date.now()))}</span>
                <div className="preview-content">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: message.replace(/\n/g, "<br />"),
                    }}
                  ></p>
                  <img src={mediaFront} alt="" />
                  {video && (
                    <iframe
                      src={video}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={video}
                    ></iframe>
                  )}
                </div>
              </div>
            </li>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default NewPostForm;
