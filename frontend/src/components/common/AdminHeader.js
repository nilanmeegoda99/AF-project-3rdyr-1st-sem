import React, {Component} from 'react';
import logo from "url:../../../public/images/logo.png";
import AuthService from '../../services/AuthService';
import { Link } from 'react-router-dom';
class AdminHeader extends Component {

    constructor(props){
        super(props);
        this.state = {
            user:{
                authorized: false,
                isAdmin: false,
                user_type: null,
            }
        }

        this.state.user = this.props.user;
        // console.log("Admin Header Data",this.props.user);
        
        this.redirectToLogin = this.redirectToLogin.bind(this);
        this.logoutUser = this.logoutUser.bind(this);
    }

    componentDidMount(){
        // var data = AuthService.getUserData();

        // if(data){
        //     var userAuthDetails = data.userData;
        //     var userType = userAuthDetails.user_type;
        //     var isAdmin = userAuthDetails.isAdmin;

        //     if(isAdmin){
        //         this.setState({
        //             user: userAuthDetails,
        //             isAdmin: true,
        //             userType: userType,
        //         })
        //     }
        //     else{
        //         this.redirectToLogin();
        //     }
        // }
        // console.log(data);
    }

    redirectToLogin = () =>{
        window.location.href = "/login";
    } 

    logoutUser = () =>{
        AuthService.userLogout();
        this.redirectToLogin();
    } 

    render() {
        return (
            
        <div>
        { 
            this.state.user.isAdmin &&

            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/admin">
                        <img src={logo}
                        alt="" width="24" height="24" className="d-inline-block align-text-top" />
                        &ensp;ICAF ADMINSTRATION
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/admin">Dashboard</Link>
                            </li>
                            
                        { 
                            this.state.user.user_type == "Super Admin" &&
                            <> 

                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" href=""
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                        Conference Details
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <>
                                            <li><Link className="dropdown-item" to="/admin/conference/create">Create Conference</Link></li>
                                            <li><Link className="dropdown-item" to="/admin/events">Conference Events</Link></li>
                                            <li><Link className="dropdown-item" to="/admin/conferences">All Conferences</Link></li>
                                        </>
                                    </ul>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" to="/admin/workshops">Workshop</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" to="/admin/researches">Research</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" to="/admin/users">Users</Link>
                                </li>
                            </>
                        }
                        { 
                            this.state.user.user_type == "Editor" &&
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" to="/admin/events">Events</Link>
                                </li>
                            </>
                        }
                        { 
                            this.state.user.user_type == "Reviewer" &&
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" to="/admin/workshops">Workshops</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" to="/admin/researches">Researches</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" to="/admin/templates">Templates</Link>
                                </li>
                            </>
                        }

                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/admin/conference">Conference</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin/profile">Profile</Link>
                            </li>
                            <div className="d-flex">
                                <button className="btn btn-outline-danger btn-sm" onClick={this.logoutUser}>
                                    Logout
                                </button>
                            </div> 


                        </ul>

                    </div>
                </div>
            </nav>
        }
        
        </div>
        
        );
    }
}

export default AdminHeader;