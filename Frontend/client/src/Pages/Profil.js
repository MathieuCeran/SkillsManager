import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navigation from "../Components/Nav/Nav";
import profil_banner from "../asset/profil_banner.jpg";
import UpdateImg from "../Components/Profil/UpdateImg";
import { UidContext } from "../Components/App.Context";
import UpdateProfil from "../Components/Profil/UpdateProfil";
import { DateParser, isEmpty } from "../Components/utils/Utils";
import { getPosts } from "../actions/post.actions";
import Card from "../Components/Post/Card";
import NewPostForm from "../Components/Post/NewPostForm";
import Login from "./Login";
import { useParams } from "react-router-dom";
import ProfilDelete from "../Components/Profil/profilDelete";

const Profil = () => {
  const [loadPost, setLoadPost] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [count, setCount] = useState(5);
  const { id } = useParams();
  const uid = useContext(UidContext);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);
  const posts = useSelector((state) => state.postReducer);

  const userPosts = Object.values(posts).filter((userPost) => {
    return userPost.userId === uid;
  });

  const loadMore = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >
      document.scrollingElement.scrollHeight
    ) {
      setLoadPost(true);
    }
  };

  useEffect(() => {
    if (loadPost) {
      dispatch(getPosts(count));
      setLoadPost(false);
      setCount(count + 5); // on ajoute +5 posts par scroll
    }
    // on surveille le scroll et au scroll on loadmore
    window.addEventListener("scroll", loadMore);
    return () => window.removeEventListener("scroll", loadMore);
  }, [loadPost, dispatch, count]);

  useEffect(() => {
    const checkAdmin = () => {
      if (uid === userData.userId && userData.isAdmin) {
        setIsAdmin(true);
      }
    };
    checkAdmin();
  }, [uid]);

  return (
    <div>
      <>
        {uid ? (
          <>
            <Navigation />
            <div className="profilContainer">
              <div className="profilHeader">
                <div className="profilUserBlock">
                  <div className="profil_media_head_img">
                    <img src={userData.media} alt="profil" />
                    {isAdmin || uid + "" === id ? <UpdateImg /> : null}
                  </div>
                  <div className="profil_name">
                    <h3>
                      {userData.firstname} {userData.name}
                    </h3>
                    <h4>{userData.service}</h4>
                  </div>
                </div>
                <div className="profil_buttons">
                  <img src={profil_banner} alt="" />
                  {isAdmin || uid + "" === id ? <UpdateProfil /> : null}
                </div>
              </div>
              <div className="body_bloc">
                <div className="left_bloc">
                  <div className="user_head">
                    <h4>Informations</h4>
                  </div>
                  <div className="user_info-bloc">
                    <div className="user_info-row">
                      <span>Adresse mail</span>
                      <p>{userData.email}</p>
                    </div>
                    <div className="user_info-row">
                      <span>Service</span>
                      <p>{userData.service}</p>
                    </div>
                    <div className="user_info-row">
                      <span>Inscrit depuis le</span>
                      <p>{DateParser(userData.createdAt)}</p>
                    </div>
                    <div className="user_info-row">
                      <div className="profil_delete_buttons">
                        <ProfilDelete />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="right_bloc">
                  <div className="post_head">
                    <h4>Posts</h4>
                  </div>

                  <NewPostForm />

                  <li>
                    {!isEmpty(userPosts[0]) &&
                      userPosts.map((post) => {
                        return <Card post={post} key={post.id} />;
                      })}
                  </li>
                </div>
              </div>
            </div>
          </>
        ) : (
          <Login />
        )}
      </>
    </div>
  );
};

export default Profil;
