import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Search from "./components/Search";

class App extends Component {
  state = {
    loading: false,
    users: [],
  };

  searchUser = async (searchQuery) => {
    try {
      this.setState({ loading: true });
      const res = await axios.get(
        `https://api.github.com/search/users?q=${searchQuery}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      this.setState({ loading: false, users: res.data.items });
    } 
    catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div className="App">
        <Navbar />
        <Search searchUser={this.searchUser} />
        <Users users={this.state.users} loading={this.state.loading} />
      </div>
    );
  }
}

export default App;
