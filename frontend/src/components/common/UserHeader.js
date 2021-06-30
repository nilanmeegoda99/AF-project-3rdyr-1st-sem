import React, { Component } from "react";
import logo from "url:../../../public/images/logo.png";
import AuthService from "../../services/AuthService";
import { Link } from "react-router-dom";
class UserHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        authorized: false,
        isAdmin: false,
        user_type: null,
      },
    };

    this.state.user = this.props.user;
    // console.log("User Header Data",this.props.user);

    this.redirectToLogin = this.redirectToLogin.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
  }

  componentDidMount() {
    // var data = AuthService.getUserData();
    // if(data){
    //     var userAuthDetails = data.userData;
    //     var userType = userAuthDetails.user_type;
    //     this.setState({
    //         user: userAuthDetails,
    //         userType: userType,
    //     })
    // }
    // console.log(data);
  }

  redirectToLogin = () => {
    window.location.href = "/login";
  };

  logoutUser = () => {
    AuthService.userLogout();
    this.redirectToLogin();
  };

  render() {
    return (
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img
              src={logo}
              alt=""
              width="24"
              height="24"
              className="d-inline-block align-text-top"
            />
            &ensp;ICAF
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/downloads">
                  Downloads
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  AboutUs
                </Link>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  href=""
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  For Researchers
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link className="dropdown-item" to="/research/instructions">
                      Instructions
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/research/published">
                      Publications
                    </Link>
                  </li>

                  {this.state.user.user_type == "Researcher" && (
                    <>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/researches/">
                          My Researches
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  href=""
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  For Workshop
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/workshops/instructions"
                    >
                      Instructions
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/workshops/published">
                      Workshops
                    </Link>
                  </li>

                  {this.state.user.user_type == "Workshop Coordinator" && (
                    <>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/workshops/">
                          My Workshops
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  href=""
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  For Attendee
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link className="dropdown-item" to="/attendee/instructions">
                      Instructions
                    </Link>
                  </li>

                  {this.state.user.user_type == "Attendee" && (
                    <>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/attendee/my">
                          My Activity
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </li>

              {this.state.user.authorized ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/user/profile">
                      Profile
                    </Link>
                  </li>
                  <div className="d-flex">
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={this.logoutUser}
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <div className="d-flex">
                  <button
                    className="btn btn-outline-success btn-sm"
                    onClick={this.redirectToLogin}
                  >
                    Login
                  </button>
                </div>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default UserHeader;
