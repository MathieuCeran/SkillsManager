import React, { useContext, useEffect, useState } from "react";
import {
  deleteComment,
  editComment,
  getComments,
} from "../../actions/comment.actions";
import { UidContext } from "../../Components/App.Context";
import { useDispatch } from "react-redux";

const UpdateComment = ({ comment, postId }) => {
  const [isAuthor, setIsAuthor] = useState(false);
  const [edit, setEdit] = useState(false);
  const [commentaire, setCommentaire] = useState("");

  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  const handleEdit = (e) => {
    e.preventDefault();

    if (commentaire) {
      try {
        dispatch(editComment(commentaire, comment.id))
          .then(() => dispatch(getComments()))
          .then(() => setCommentaire(""))
          .then(() => setEdit(false));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDelete = (e) => {
    dispatch(deleteComment(comment.id));
  };

  useEffect(() => {
    const checkAuthor = () => {
      if (uid === comment.userId) {
        setIsAuthor(true);
      }
    };
    checkAuthor();
  }, [uid]);

  return (
    <div className="edit-comment">
      {edit === false && (
        <span onClick={() => setEdit(!edit)}>
          <i className="far fa-edit"></i>
        </span>
      )}
      {edit && (
        <form action="" onSubmit={handleEdit} className="edit-comment-form">
          <label
            htmlFor="text"
            className="mode-edition"
            onClick={() => setEdit(!edit)}
          >
            <i className="far fa-edit edit-icon"></i>
          </label>
          <br />
          <input
            type="text"
            name="text"
            onChange={(e) => setCommentaire(e.target.value)}
            defaultValue={comment.commentaire}
          />
          <br />
          <i
            onClick={() => {
              if (window.confirm("Voulez-vous supprimer ce commentaire ?")) {
                handleDelete();
              }
            }}
            className="far fa-trash-alt poub"
          ></i>
          <input
            type="submit"
            value="Valider modification"
            className="modif-com"
          />
        </form>
      )}
    </div>
  );
};

export default UpdateComment;
