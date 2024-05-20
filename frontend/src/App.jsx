import React from "react";
import axios from "axios";
import CreateList from "./components/CreateList";
import UserList from "./components/UserList";

axios.defaults.baseURL = "https://user-list-backend-1.onrender.com/chiru/v1/";
// axios.defaults.baseURL = "http://localhost:5000/chiru/v1/";

axios.defaults.withCredentials = true;

const App = () => (
  <div>
    <CreateList />
    <UserList />
  </div>
);

export default App;
