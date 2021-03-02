import React, { Fragment, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Search from "./components/Search";
import Alert from "./components/layout/Alert";
import About from "./components/About";
import NotFound from './components/NotFound'

let githubClientId;
let githubClientSecret;

if(process.env.NODE_ENV !== 'production') {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET  
}
else {
  githubClientId = process.env.GITHUB_CLIENT_ID
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET
}


const App = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [alert, setAlertMsg] = useState(null);

  const searchUser = async (searchQuery) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://api.github.com/search/users?q=${searchQuery}&client_id=${githubClientId}&client_secret=${githubClientSecret}`
      );
      setUsers(res.data.items);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const clearUser = () => {
    setUsers([]);
    setLoading(false);
  };

  const setAlert = (msg, type) => {
    setAlertMsg({ msg, type });

    setTimeout(() => {
      setAlertMsg({ alert: null });
    }, 1250);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        {alert !== null ? <Alert alert={alert} /> : null}
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <Fragment>
                <Search
                  searchUser={searchUser}
                  clearUser={clearUser}
                  showBtn={users.length > 0 ? true : false}
                  setAlert={setAlert}
                />
                <Users users={users} loading={loading} />
              </Fragment>
            )}
          />
          <Route path="/about" exact component={About} />
          <Route component={NotFound}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
