import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLikes } from "../../actions/likes.actions";
import { likePost, unlikePost } from "../../actions/post.actions";
import { UidContext } from "../App.Context";

const Like = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const likesData = useSelector((state) => state.likesReducer);
  const userData = useSelector((state) => state.userReducer);
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  // on recupere tous les likes du post
  const likesDuPost = Object.values(likesData).filter((like) => {
    return like.postId === post.id;
  });

  const numblikes = likesDuPost.length;

  useEffect(() => {
    dispatch(getLikes());
    const userLike = Object.values(likesDuPost).map((like) => {
      if (post.userId === like.userId) setLiked(true);
    });
  }, [liked, uid]);

  const handleLike = () => {
    if (liked === false) {
      try {
        dispatch(likePost(post.id, userData.id)).then(() => setLiked(true));
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        dispatch(unlikePost(post.id, userData.id)).then(() => setLiked(false));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div onClick={handleLike}>
      <div className="placement">
        {liked ? (
          <i className="fas fa-heart red"></i>
        ) : (
          <i className="far fa-heart"></i>
        )}
        <p> {numblikes} {numblikes > 1 ? ("Likes") : ("Like")}</p>
      </div>
    </div>
  );
};

export default Like;
