import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getLikes } from "../actions/likes.actions";
import { getPosts } from "../actions/post.actions";
import Card from "./Post/Card";
import { isEmpty } from "./utils/Utils";

const Thread = () => {
  const [loadPost, setLoadPost] = useState(true);
  const [query, setQuery] = useState("");
  const [count, setCount] = useState(5);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postReducer);

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
      dispatch(getLikes());
      setLoadPost(false);
      setCount(count + 5); // on ajoute +5 posts par scroll
    }
    // on surveille le scroll et au scroll on loadmore
    window.addEventListener("scroll", loadMore);
    return () => window.removeEventListener("scroll", loadMore);
  }, [loadPost, dispatch, count]);

  return (
    <>
      <div className="post-container">
        <div className="search_post">
          <input
            type="text"
            placeholder=" Rechercher un post"
            className="searchbar_post"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="thread-container">
        <li>
          {!isEmpty(posts[0]) &&
            posts
              .filter((post) => post.texte.toLowerCase().includes(query))
              .map((post) => {
                return <Card post={post} key={post.id} />;
              })}
        </li>
      </div>
    </>
  );
};

export default Thread;
