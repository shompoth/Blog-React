// Librairies
import React from "react";
import classes from "./DisplayedArticles.module.css";

// Composants
import DisplayedArticle from "./DisplayedArticle/DisplayedArticle";

function DisplayedArticles(props) {
  let articles = props.articles.map((article) => (
    <DisplayedArticle key={article.id} article={article} />
  ));

  return (
    <section className={[classes.DisplayedArticles, "container"].join(" ")}>
      {articles}
    </section>
  );
}

export default DisplayedArticles;
