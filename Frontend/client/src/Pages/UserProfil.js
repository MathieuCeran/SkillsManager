import { useParams } from "react-router-dom";
import Navigation from "../Components/Nav/Nav";
import UpdateImg from "../Components/Profil/UpdateImg";
import profil_banner from "../asset/profil_banner.jpg";
import UpdateProfil from "../Components/Profil/UpdateProfil";
import { DateParser, isEmpty } from "../Components/utils/Utils";
import Card from "../Components/Post/Card";
import Login from "./Login";
import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect, useState } from "react";
import { getPosts } from "../actions/post.actions";
import { UidContext } from "../Components/App.Context";
import { getUsers } from "../actions/users.actions";
import ProfilDelete from "../Components/Profil/profilDelete";
import CompetenceCard from "../Components/Formation/CompetenceCard";

const UserProfil = () => {
  const { id } = useParams();
  const uid = useContext(UidContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const posts = useSelector((state) => state.postReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const userPosts = Object.values(posts).filter((post) => {
    return post.userId + "" === id;
  });

  const userId = Object.values(usersData).filter((user) => {
    return user.id + "" === id;
  });

  const userCoach = Object.values(usersData).map((user) => {
    return user.id;
  });

  const userCoachs = Object.values(usersData).filter((user) => {
    return user.id;
  });

  useEffect(() => {
    dispatch(getPosts());
    dispatch(getUsers());
  }, [dispatch, userData]);

  useEffect(() => {
    const checkAdmin = () => {
      if (uid === userData.id && userData.isAdmin) {
        setIsAdmin(true);
      }
    };
    checkAdmin();
  }, [isAdmin, uid, userData]);

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
                    <img
                      src={userId
                        .map((user) => {
                          if (user.id + "" === id) return user.media;
                          else return null;
                        })
                        .join("")}
                      alt="profil"
                    />
                    {isAdmin || uid + "" === id ? <UpdateImg /> : null}
                  </div>
                  <div className="profil_name">
                    <h3>
                      {userId.map((user) => {
                        if (user.id + "" === id)
                          return user.firstname + " " + user.name;
                        else return null;
                      })}
                    </h3>
                    <h4>
                      {userId.map((user) => {
                        if (user.id + "" === id) return user.service;
                        else return null;
                      })}
                    </h4>
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
                      <span>Mon Coach</span>
                      <p>
                        {userId.map((user) => {
                          if (user.id + "" === id && user.coach ) return user.coach;
                          else return <p> Pas de Coach</p>;
                        })}
                      </p>
                    </div>
                    <div className="user_info-row">
                      <span>Adresse mail</span>
                      <p>
                        {userId.map((user) => {
                          if (user.id + "" === id) return user.email;
                          else return null;
                        })}
                      </p>
                    </div>
                    <div className="user_info-row">
                      <span>Service</span>
                      <p>
                        {userId.map((user) => {
                          if (user.id + "" === id) return user.service;
                          else return null;
                        })}
                      </p>
                    </div>
                    <div className="user_info-row">
                      <span>Dernière mise à jour</span>
                      <p>
                        {userId.map((user) => {
                          if (user.id + "" === id)
                            return DateParser(user.updatedAt);
                          else return null;
                        })}
                      </p>
                    </div>
                    <div className="user_info-row">
                      <div className="profil_delete_buttons">
                        <ProfilDelete />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="right_bloc">
                  <div className="posthead_">
                    <div className="post_head_competences">
                      <h4>Mes Compétences</h4>
                    </div>
                  </div>
                  <div className="posthead">
                    <div className="post_head_competences">
                      {userId.map((user) => {
                        return <CompetenceCard user={user} key={user.id} />;
                      })}
                    </div>
                  </div>
                  {isAdmin ? (
                    <>
                      <li>
                        {!isEmpty(userPosts[0]) &&
                          userPosts.map((post) => {
                            return <Card post={post} key={post.id} />;
                          })}
                      </li>
                    </>
                  ) : null}
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

export default UserProfil;
