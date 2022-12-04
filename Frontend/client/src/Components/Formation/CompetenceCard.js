import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersFormations } from "../../actions/usersFormation.actions";
import MiniLogo from "../Logo/MiniLogo";
import { DateParser } from "../utils/Utils";
import Challenge from "../Logo/Challenge";

const CompetenceCard = (user) => {
  const userData = useSelector((state) => state.userReducer);
  const usersFormationsData = useSelector(
    (state) => state.usersformationsReducer
  );

  const dispatch = useDispatch();
  const userId = user.user.id;

  useEffect(() => {
    dispatch(getUsersFormations(userId));
  }, []);

  const formations = Object.values(usersFormationsData).filter((formation) => {
    return formation;
  });

  // if(formations)
  return (
    <>
      {formations.map((competence) => {
        return (
          <div className="formation_container pyro" key={competence.id}>
            <div className="before"></div>
            <div className="after"></div>
            <div className="formation_container_head">
              <div className="formation_head_img">
                <MiniLogo />
              </div>
              <div className="formation_head_label">
                <p>Formation</p>
              </div>
            </div>

            <div className="formation_container_body">
              <div className="formation_name">
                {competence.Formation.formationName}
              </div>
              <div className="formation_lvl">
                <p>
                  <i className="fa-solid fa-layer-group"></i>{" "}
                  {competence.Formation.formationLvl}
                </p>
                <Challenge />
              </div>
            </div>
            {userData.isAdmin ? (
              <div className="formation_container_footer">
                <progress
                  className="progress is-danger"
                  value={competence.formationPercent}
                  max="100"
                ></progress>
                <p>{DateParser(competence.formationDate)}</p>
              </div>
            ) : null}
          </div>
        );
      })}
    </>
  );
};

export default CompetenceCard;
