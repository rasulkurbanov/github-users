import React, { Component, Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Search from "./components/Search";
import Alert from "./components/layout/Alert";
import About from './components/About'

class App extends Component {
  state = {
    loading: false,
    users: [],
    alert: null,
  };

  searchUser = async (searchQuery) => {
    try {
      this.setState({ loading: true });
      const res = await axios.get(
        `https://api.github.com/search/users?q=${searchQuery}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      this.setState({ loading: false, users: res.data.items });
    } catch (error) {
      console.log(error);
    }
  };

  clearUser = () => this.setState({ users: [], loading: false });

  setAlert = (msg, type) => {
    this.setState({ alert: { msg: msg, type: type } });

    setTimeout(() => {
      this.setState({ alert: null });
    }, 1250);
  };

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          {this.state.alert !== null ? (
            <Alert alert={this.state.alert} />
          ) : null}

          <Switch>
            
            <Route
              exact
              path="/"
              render={ props => (
                <Fragment>
                  <Search
                    searchUser={this.searchUser}
                    clearUser={this.clearUser}
                    showBtn={this.state.users.length > 0 ? true : false}
                    setAlert={this.setAlert}
                  />
                  <Users users={this.state.users} loading={this.state.loading} /> 
                </Fragment>
              )}
            />

            <Route path="/about" exact component={About}/>

          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
