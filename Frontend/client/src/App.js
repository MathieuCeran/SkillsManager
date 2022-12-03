import React, { useState, useEffect } from "react";
import Routes from "./Components/Roots";
import { UidContext } from "./Components/App.Context";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user.actions";

function App() {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  // On recupere le cookie pour ensuite afficher l'id sur tout le site
  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/api/user/jwt`,
      withCredentials: true,
    })
      .then((res) => {
        setUid(res.data.userId);
      })
      .catch((err) => console.log(err));
  }, [uid]);

  if (uid) dispatch(getUser(uid));

  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  );
}

export default App;
