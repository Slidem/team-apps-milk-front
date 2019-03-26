import React, { Component } from "react";
import Navbar from "./components/navbar";
import MilkTable from "./components/milkTable";
import * as userService from "./services/userService";
import tokenRegistry from "./config/tokenRegistry";
import httpService from "./services/httpService";

class App extends Component {
  state = {
    connectedUser: {
      id: "",
      login: "",
      firstName: "",
      lastName: "",
      email: ""
    }
  };

  async componentDidMount() {
    tokenRegistry.setToken(tokenRegistry.getTokenFromUrl());

    const userResponse = await userService.getUserInfo();
    const { id, login, firstName, lastName, email } = userResponse.data;
    const connectedUser = {
      id,
      login,
      firstName,
      lastName,
      email
    };
    this.setState({ connectedUser });
  }

  handleLogout = async () => {
    tokenRegistry.removeToken();
    await userService.getUserInfo();
  };

  render() {
    return (
      <React.Fragment>
        <Navbar
          connectedUser={this.state.connectedUser}
          onLogout={this.handleLogout}
        />

        <main className="container">
          <MilkTable connectedUser={this.state.connectedUser} />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
