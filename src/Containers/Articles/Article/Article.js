// Librairies
import React, { useState, useEffect } from "react";
import axios from "../../../config/axios-firebase";
import classes from "./Article.module.css";
import routes from "../../../config/routes";
import { Link } from "react-router-dom";

function Article(props) {
  // State
  const [article, setArticle] = useState({});

  // ComponentDidMount
  useEffect(() => {
    axios
      .get(
        '/articles.json?orderBy="slug"&equalTo="' +
          props.match.params.slug +
          '"'
      )
      .then((response) => {
        // Redirection page Home si article introuvable
        if (Object.keys(response.data).length === 0) {
          props.history.push(routes.HOME);
        }

        for (let key in response.data) {
          setArticle({
            ...response.data[key],
            id: key,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Fonctions
  const deleteClickedHandler = () => {
    axios
      .delete("/articles/" + article.id + ".json")
      .then((response) => {
        props.history.push(routes.HOME);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Variables
  let date = new Date(article.date).toLocaleDateString("fr-FR");

  return (
    <div className="container">
      <h1>{article.titre}</h1>
      <div className={classes.content}>
        <div className={classes.lead}>{article.accroche}</div>
        {article.contenu}
        <div className={classes.button}>
          <Link
            to={{
              pathname: routes.MANAGE_ARTICLE,
              state: { article: article },
            }}
          >
            <button>Modifier</button>
          </Link>
          <button onClick={deleteClickedHandler}>Supprimer</button>
        </div>
      </div>
      <div className={classes.author}>
        <b>{article.auteur}</b>
        <span> - Publié le {date}.</span>
        {article.brouillon === "true" ? (
          <span className={classes.badge}>Brouillon</span>
        ) : null}
      </div>
    </div>
  );
}

export default Article;
