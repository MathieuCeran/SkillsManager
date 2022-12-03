import React, { useState } from "react";
import axios from "axios";
import validator from "validator";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const SignupForm = () => {
  const [firstname, setFirstName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [service, setService] = useState("");

  //Regex pour le controle du password
  let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
  let testPassword = strongRegex.test(password);

  //Regex pour le controle de l'eamil
  let strongEmailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i);
  let testEmail = strongEmailRegex.test(email);

  console.log(service);

  const handleSignup = (e) => {
    e.preventDefault();
    if (!firstname || !name || !email || !password || !service) {
      toast.error("veuillez remplir tous les champs du formulaire");
    } else if (!testPassword) {
      toast.error(
        "Le mot de passe doit comprendre 8 caractères dont deux chiffre, sans espaces. Ainsi qu'une lettre majuscule et minuscule."
      );
    } else if (!testEmail) {
      toast.error("Veuillez verifier votre email, il semble incorrect");
    } else {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/api/user/signup`,
        withCredentials: true,
        data: {
          name,
          firstname,
          email,
          password,
          service,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.errors) {
          } else {
            window.location = "/";
          }
        })
        .catch(function (error) {
          if (error.response) {
            toast.error(error.response.data.message);
          }
        });
    }
  };

  return (
    <>
      <ToastContainer />
      <form action="" onSubmit={handleSignup}>
        <label htmlFor="name">Nom</label>
        <input
          type="text"
          name="name"
          className="input_signup"
          id="name"
          placeholder="Entrez votre nom"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />
        <br />
        <label htmlFor="firstname">Prénom</label>
        <input
          type="text"
          name="firstname"
          className="input_signup"
          id="firstname"
          placeholder="Entrez votre prénom"
          onChange={(e) => setFirstName(e.target.value)}
          value={firstname}
          required
        />
        <br />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          className="input_signup"
          id="email"
          placeholder="Entrez votre mail"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <br />
        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          name="password"
          className="input_signup"
          id="password"
          placeholder="Entrez votre mot de passe"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <br />
        <label htmlFor="password">Service</label>

        <select
          name="service"
          id="service"
          onChange={(e) => setService(e.target.value)}
        >
          <option value="">--Choisissez votre service--</option>
          <option value="Coach">Coach</option>
          <option value="Référent technique">Référent technique</option>
          <option value="E-commerce">Chargé de site E-commerce</option>
          <option value="Graphiste">Graphiste</option>
          <option value="Chargé de projet web">Chargé de projet web</option>
          <option value="Trafic manager">Trafic manager</option>
          <option value="Ordonnancement">Ordonnancement</option>
        </select>

        {/* <input
          type="text"
          name="service"
          className="input_signup"
          id="service"
          placeholder="Entrez votre service"
          onChange={(e) => setService(e.target.value)}
          value={service}
          required
        /> */}
        <br />
        <input type="submit" className="submit" value="Inscription" />
      </form>
    </>
  );
};

export default SignupForm;
