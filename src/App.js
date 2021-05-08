// Librairies
import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import routes from "./config/routes";

// Composants
import Layout from "./hoc/Layout/Layout";
import Home from "./Containers/Home/Home";
import Contact from "./Components/Contact/Contact";
import Articles from "./Containers/Articles/Articles";
import Article from "./Containers/Articles/Article/Article";
import ManageArticle from "./Containers/Admin/ManageArticle/ManageArticle";

function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route exact path={routes.HOME} component={Home} />
          <Route path={routes.CONTACT} component={Contact} />
          <Route exact path={routes.ARTICLES} component={Articles} />
          <Route exact path={routes.ARTICLES + "/:slug"} component={Article} />
          <Route exact path={routes.MANAGE_ARTICLE} component={ManageArticle} />
          <Route render={() => <h1>Error 404</h1>} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
