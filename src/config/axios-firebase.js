import axios from "axios";

const instance = axios.create({
  baseURL:
    "https://blog-react-c3132-default-rtdb.europe-west1.firebasedatabase.app/",
});

export default instance;
