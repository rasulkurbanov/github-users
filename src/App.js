import React, { Fragment, useReducer } from "react";
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

//Creating initial state 
const initialState = {
  loading: false,
  users: [],
  alert: null
}

const reducer = (state, action) => {
  switch(action.type) {
    case "GITHUB_PROFILE_REQUEST":
      return {
        ...state,
        loading: true
      }
    case "GITHUB_PROFILE_SUCCESS":
      return {
        ...state,
        loading: false,
        users: action.payload,
      }  
    case "GITHUB_PROFILE_ERROR":
      return {
        ...state,
        alert: action.payload
      }
    default: 
      return state
  }
}

const App = () => {
  const [ state, dispatch ] = useReducer(reducer, initialState)


  const searchUser = async (searchQuery) => {
    try {
      dispatch({
        type: "GITHUB_PROFILE_REQUEST"
      })

      const res = await axios.get(
        `https://api.github.com/search/users?q=${searchQuery}&client_id=${githubClientId}&client_secret=${githubClientSecret}`
      );
      dispatch({
        type: "GITHUB_PROFILE_SUCCESS",
        payload: res.data.items
      })
    } catch (error) {
      console.log(error);
    }
  };

  const clearUser = () => {
    dispatch({
      type: "GITHUB_PROFILE_SUCCESS",
      payload: []
    })
  };

  const setAlert = (msg, type) => {
    dispatch({
      type: "GITHUB_PROFILE_ERROR",
      payload: {msg, type}
    })

    setTimeout(() => {
      dispatch({
        type: "GITHUB_PROFILE_ERROR",
        payload: null
      })
    }, 1250);
  };

  const {alert, users, loading} = state

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
