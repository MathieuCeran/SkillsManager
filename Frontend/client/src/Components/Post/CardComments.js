import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addComment, getComments } from "../../actions/comment.actions";
import { UidContext } from "../App.Context";
import { DateParser, isEmpty } from "../utils/Utils";
import UpdateComment from "./UpdateComment";

const CardComments = ({ post }) => {
  const [commentaire, setComment] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const uid = useContext(UidContext);
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const commentsData = useSelector((state) => state.commentReducer);
  const dispatch = useDispatch();

  const handleComment = (e) => {
    e.preventDefault();

    if (commentaire) {
      dispatch(addComment(commentaire, post.id, userData.id))
        .then(() => dispatch(getComments()))
        .then(() => setComment(""));
    }
  };

  useEffect(() => {
    dispatch(getComments());
  }, []);

  const commDuPost = Object.values(commentsData).filter((comment) => {
    return comment.postId === post.id;
  });

  useEffect(() => {
    const checkAdmin = () => {
      if (uid === userData.id && userData.isAdmin) {
        setIsAdmin(true);
      }
    };
    checkAdmin();
  }, [uid]);

  return (
    <div className="comments-container">
      {commDuPost.map((comment) => {
        return (
          <div
            key={comment.id}
            className={
              comment.author === comment.userId
                ? "comment-container user"
                : "comment-container"
            }
          >
            <div className="left-part">
              <img
                src={
                  !isEmpty(usersData[0]) &&
                  usersData
                    .map((user) => {
                      if (user.id === comment.userId) return user.media;
                      else return null;
                    })
                    .join("")
                }
                alt="user"
              />
            </div>
            <div className="right-part">
              <div className="comment-header">
                <h3>
                  {!isEmpty(usersData[0]) &&
                    usersData
                      .map((user) => {
                        if (user.id === comment.userId)
                          return user.firstname + " " + user.name;
                        else return null;
                      })
                      .join("")}
                </h3>
                <span>{DateParser(comment.createdAt)}</span>
              </div>
              <p className="comment-content">{comment.commentaire}</p>
              {isAdmin || userData.id === comment.userId ? (
                <UpdateComment comment={comment} postId={post.id} />
              ) : null}
            </div>
          </div>
        );
      })}
      <div className="commentForm">
        <div className="commentForm-picture">
          <img src={userData.media} alt="user" />
        </div>
        <div className="commentForm-form">
          <form action="" onSubmit={handleComment} className="comment-form">
            <input
              type="text"
              name="text"
              onChange={(e) => setComment(e.target.value)}
              value={commentaire}
              placeholder="Poster un commentaire..."
            />
            <br />
            <input type="submit" value="Envoyer" className="inputCommentaire" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default CardComments;
