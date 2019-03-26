import React, { Component } from "react";
import "../css/navbar.css";

class Navbar extends Component {
  render() {
    const { login, firstName, lastName, email } = this.props.connectedUser;

    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#collapsing-navbar"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="collapse navbar-collapse flex-grow-1 text-right"
          id="collapsing-navbar"
        >
          <ul className="nav navbar-nav ml-auto justify-content-end w-200">
            <li className="nav-item dropdown">
              <div
                className="nav-link dropdown-toggle"
                id="navbarDropdownMenuLink"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="fa fa-user-o" aria-hidden="true" />
                <span className="pr-2 pl-2">{login}</span>
              </div>
              <div
                id="user-info-dropdown"
                className="dropdown-menu dropdown-menu-right float-right"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <div className="container text-center pl-4 pr-4 pt-2 pb-2">
                  <div className="row mb-3">
                    <div className="col-3">
                      <i className="fa fa-user-circle" aria-hidden="true" />
                    </div>
                    <div className="col">
                      <p>{`${firstName} ${lastName}`}</p>
                      <p>{email}</p>
                    </div>
                  </div>
                  <div className="row">
                    <button
                      onClick={this.props.onLogout}
                      className="btn btn-primary btn-block"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
