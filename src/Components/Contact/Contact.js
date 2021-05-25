// Librairies
import React, { useEffect } from "react";
import classes from "./Contact.module.css";
import { Route } from "react-router-dom";

function Contact(props) {
  // ComponentDidUpdate
  useEffect(() => {
    document.title = "Contact";
  });

  // Fonctions
  const emailClickedHandler = () => {
    props.history.push(props.match.url + "/email");
  };

  const callClickedHandler = () => {
    props.history.push(props.match.url + "/telephone");
  };
  return (
    <>
      <h1>Contact</h1>
      <button onClick={emailClickedHandler} className={classes.button}>
        Email
      </button>
      <button onClick={callClickedHandler} className={classes.button}>
        Téléphone
      </button>

      <Route path={props.match.url + "/email"} render={() => <p>hello-world@gmail.com</p>} />
      <Route path={props.match.url + "/telephone"} render={() => <p>06 06 06 06 06</p>} />
    </>
  );
}

export default Contact;
