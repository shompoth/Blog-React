// Librairies
import React, { useState, useEffect } from "react";
import classes from "./ManageArticle.module.css";
import axios from "../../../config/axios-firebase";
import routes from "../../../config/routes";
import { checkValidity } from "../../../shared/utility";
import fire from "../../../config/firebase";
import { toast } from "react-toastify";

// Composants
import Input from "../../../Components/UI/Input/Input";

function ManageArticle(props) {
  // States
  const [inputs, setInputs] = useState({
    titre: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Titre de l'article",
      },
      value: props.location.state && props.location.state.article ? props.location.state.article.titre : "",
      label: "Titre",
      valid: props.location.state && props.location.state.article ? true : false,
      validation: {
        required: true,
        minLength: 5,
        maxLength: 85,
      },
      touched: false,
      errorMessage: "Le titre doit faire entre 5 et 85 caractères.",
    },
    accroche: {
      elementType: "textarea",
      elementConfig: {},
      value: props.location.state && props.location.state.article ? props.location.state.article.accroche : "",
      label: "Accroche",
      valid: props.location.state && props.location.state.article ? true : false,
      validation: {
        required: true,
        minLength: 10,
        maxLength: 140,
      },
      touched: false,
      errorMessage: "L'accroche ne doit pas être vide et doit être comprise entre 10 et 140 caractères",
    },
    contenu: {
      elementType: "textarea",
      elementConfig: {},
      value: props.location.state && props.location.state.article ? props.location.state.article.contenu : "",
      label: "Contenu de l'article",
      valid: props.location.state && props.location.state.article ? true : false,
      validation: {
        required: true,
      },
      touched: false,
      errorMessage: "Le contenu ne doit pas être vide.",
    },
    auteur: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Auteur de l'article",
      },
      value: props.location.state && props.location.state.article ? props.location.state.article.auteur : "",
      label: "Auteur",
      valid: props.location.state && props.location.state.article ? true : false,
      validation: {
        required: true,
      },
      touched: false,
      errorMessage: "Il doit y avoir un auteur pour cet article.",
    },
    brouillon: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: true, displayValue: "Brouillon" },
          { value: false, displayValue: "Publié" },
        ],
      },
      value: props.location.state && props.location.state.article ? props.location.state.article.brouillon : "",
      label: "Etat",
      valid: true,
      validation: {},
    },
  });

  const [validForm, setValidForm] = useState(props.location.state && props.location.state.article ? true : false);

  //ComponentDidUpdate
  useEffect(() => {
    document.title = "Gérer un article";
  });

  // Fonctions
  const inputChangedHandler = (event, id) => {
    //Change la valeur
    const newInputs = { ...inputs };
    newInputs[id].value = event.target.value;
    newInputs[id].touched = true;

    // Verification de la valeur
    newInputs[id].valid = checkValidity(event.target.value, newInputs[id].validation);
    setInputs(newInputs);
    // Verification formulaire
    let formIsValid = true;
    for (let input in newInputs) {
      formIsValid = newInputs[input].valid && formIsValid;
    }
    setValidForm(formIsValid);
  };

  const generateSlug = (str) => {
    str = str.replace(/^\s+|\s+$/g, ""); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = "àáãäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to = "aaaaaeeeeiiiioooouuuunc------";

    for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
    }

    str = str
      .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
      .replace(/\s+/g, "-") // collapse whitespace and replace by -
      .replace(/-+/g, "-"); // collapse dashes

    return str;
  };

  const formHandler = (event) => {
    event.preventDefault();

    const slug = generateSlug(inputs.titre.value);
    // Pensez à verifier si le slug existe sur firebase si oui, bouclez et rajouter - 1.. - 2..

    const article = {
      titre: inputs.titre.value,
      contenu: inputs.contenu.value,
      auteur: inputs.auteur.value,
      brouillon: inputs.brouillon.value,
      accroche: inputs.accroche.value,
      date: Date.now(),
      slug: slug,
    };

    fire
      .auth()
      .currentUser.getIdToken()
      .then((token) => {
        if (props.location.state && props.location.state.article) {
          axios
            .put("/articles/" + props.location.state.article.id + ".json?auth=" + token, article)
            .then((response) => {
              console.log(response);
              toast.success("Article modifié avec succès");
              props.history.replace(routes.ARTICLES + "/" + article.slug);
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          axios
            .post("/articles.json?auth=" + token, article)
            .then((response) => {
              console.log(response);
              toast.success("Article ajouté avec succès");

              props.history.replace(routes.ARTICLES);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Variables
  const formElementsArray = [];
  for (let key in inputs) {
    formElementsArray.push({
      id: key,
      config: inputs[key],
    });
  }

  let form = (
    <form className={classes.ManageArticle} onSubmit={(e) => formHandler(e)}>
      {formElementsArray.map((formElement) => (
        <Input
          key={formElement.id}
          id={formElement.id}
          value={formElement.config.value}
          label={formElement.config.label}
          type={formElement.config.elementType}
          config={formElement.config.elementConfig}
          valid={formElement.config.valid}
          touched={formElement.config.touched}
          errorMessage={formElement.config.errorMessage}
          changed={(e) => inputChangedHandler(e, formElement.id)}
        />
      ))}
      <div className={classes.submit}>
        <input type="submit" value={props.location.state && props.location.state.article ? "Modifier un article" : "Ajouter un article"} disabled={!validForm} />
      </div>
    </form>
  );

  return (
    <div className="container">
      {props.location.state && props.location.state.article ? <h1>Modifier</h1> : <h1>Ajouter</h1>}

      {form}
    </div>
  );
}

export default ManageArticle;
