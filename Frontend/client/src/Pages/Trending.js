import React from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "../Components/utils/Utils";
import { Accordion, AccordionItem } from "react-light-accordion";
import "react-light-accordion/demo/css/index.css";
import { Link } from "react-router-dom";

const Trending = () => {
  const usersData = useSelector((state) => state.usersReducer);

  const coach = Object.values(usersData).filter((user) => {
    return user.service === "Coach";
  });

  const ecommerce = Object.values(usersData).filter((user) => {
    return user.service === "E-commerce";
  });

  const graphiste = Object.values(usersData).filter((user) => {
    return user.service === "Graphiste";
  });

  const cpw = Object.values(usersData).filter((user) => {
    return user.service === "Chargé de projet web";
  });

  const traficmanager = Object.values(usersData).filter((user) => {
    return user.service === "Trafic manager";
  });

  const referenttechnique = Object.values(usersData).filter((user) => {
    return user.service === "Référent technique";
  });

  const ordonnancement = Object.values(usersData).filter((user) => {
    return user.service === "Ordonnancement";
  });

  const Ecommerce = () => (
    <div className="useronline-container">
      <>
        {!isEmpty(usersData[0]) &&
          ecommerce.map((users) => {
            return (
              <Link to={`/userprofil/${users.id}`} key={users.id}>
                <div className="user-online">
                  <div className="left-side">
                    <div>{users.media && <img src={users.media} alt="" />}</div>
                  </div>
                  <div className="right-side">
                    <span>
                      {users.firstname} {users.name}
                    </span>
                    <span className="service">{users.service}</span>
                  </div>
                </div>
              </Link>
            );
          })}
      </>
    </div>
  );

  const Graphiste = () => (
    <div className="useronline-container">
      <>
        {!isEmpty(usersData[0]) &&
          graphiste.map((users) => {
            return (
              <Link to={`/userprofil/${users.id}`} key={users.id}>
                <div className="user-online">
                  <div className="left-side">
                    <div>{users.media && <img src={users.media} alt="" />}</div>
                  </div>
                  <div className="right-side">
                    <span>
                      {users.firstname} {users.name}
                    </span>
                    <span className="service">{users.service}</span>
                  </div>
                </div>
              </Link>
            );
          })}
      </>
    </div>
  );

  const Coach = () => (
    <div className="useronline-container">
      <>
        {!isEmpty(usersData[0]) &&
          coach.map((users) => {
            return (
              <Link to={`/userprofil/${users.id}`} key={users.id}>
                <div className="user-online">
                  <div className="left-side">
                    <div>{users.media && <img src={users.media} alt="" />}</div>
                  </div>
                  <div className="right-side">
                    <span>
                      {users.firstname} {users.name}
                    </span>
                    <span className="service">{users.service}</span>
                  </div>
                </div>
              </Link>
            );
          })}
      </>
    </div>
  );

  const Cpw = () => (
    <div className="useronline-container">
      <>
        {!isEmpty(usersData[0]) &&
          cpw.map((users) => {
            return (
              <Link to={`/userprofil/${users.id}`} key={users.id}>
                <div className="user-online">
                  <div className="left-side">
                    <div>{users.media && <img src={users.media} alt="" />}</div>
                  </div>
                  <div className="right-side">
                    <span>
                      {users.firstname} {users.name}
                    </span>
                    <span className="service">{users.service}</span>
                  </div>
                </div>
              </Link>
            );
          })}
      </>
    </div>
  );

  const Traficmanager = () => (
    <div className="useronline-container">
      <>
        {!isEmpty(usersData[0]) &&
          traficmanager.map((users) => {
            return (
              <Link to={`/userprofil/${users.id}`} key={users.id}>
                <div className="user-online">
                  <div className="left-side">
                    <div>{users.media && <img src={users.media} alt="" />}</div>
                  </div>
                  <div className="right-side">
                    <span>
                      {users.firstname} {users.name}
                    </span>
                    <span className="service">{users.service}</span>
                  </div>
                </div>
              </Link>
            );
          })}
      </>
    </div>
  );

  const Referenttechnique = () => (
    <div className="useronline-container">
      <>
        {!isEmpty(usersData[0]) &&
          referenttechnique.map((users) => {
            return (
              <Link to={`/userprofil/${users.id}`} key={users.id}>
                <div className="user-online">
                  <div className="left-side">
                    <div>{users.media && <img src={users.media} alt="" />}</div>
                  </div>
                  <div className="right-side">
                    <span>
                      {users.firstname} {users.name}
                    </span>
                    <span className="service">{users.service}</span>
                  </div>
                </div>
              </Link>
            );
          })}
      </>
    </div>
  );

  const Ordonnancement = () => (
    <div className="useronline-container">
      <>
        {!isEmpty(usersData[0]) &&
          ordonnancement.map((users) => {
            return (
              <Link to={`/userprofil/${users.id}`} key={users.id}>
                <div className="user-online">
                  <div className="left-side">
                    <div>{users.media && <img src={users.media} alt="" />}</div>
                  </div>
                  <div className="right-side">
                    <span>
                      {users.firstname} {users.name}
                    </span>
                    <span className="service">{users.service}</span>
                  </div>
                </div>
              </Link>
            );
          })}
      </>
    </div>
  );

  return (
    <>
      <div>
        <h3>Utilisateurs par services</h3>
      </div>
      <div className="items">
        <Accordion atomic={true}>
          <AccordionItem title="Coach">
            <Coach />
          </AccordionItem>

          <AccordionItem title="Référent Technique">
            <Referenttechnique />
          </AccordionItem>

          <AccordionItem title="Chargé de site E-commerce">
            <Ecommerce />
          </AccordionItem>

          <AccordionItem title="Graphistes">
            <Graphiste />
          </AccordionItem>

          <AccordionItem title="Chargé de projet web">
            <Cpw />
          </AccordionItem>

          <AccordionItem title="Trafic manager">
            <Traficmanager />
          </AccordionItem>

          <AccordionItem title="Ordonnancement">
            <Ordonnancement />
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
};

export default Trending;
