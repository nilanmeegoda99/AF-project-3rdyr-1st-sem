import React, { Children, Component } from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import AuthService from '../services/AuthService'

//get user details from local storage
function getUserDetailsFromStorage(){
    var user = AuthService.getUserData();
    
    // console.log(user);

    if(user){
        return user.userData;
    }
    else{
        return null;
    }
}

//check user type is researcher
function ResearcherRoutes({ component: ProComponent, ...rest}){

    // console.log("object",authed, userType)
    var userDetails = getUserDetailsFromStorage();

    if(userDetails != null){
        return(
            <Route
            { ...rest}
                render={
                    (props) => (userDetails.user_type === "Researcher")?
                        <ProComponent {...props} />
                    :
                    <Redirect to="/session/401" /> 
                }
            />
        )
    }
    else{
        return(
            <Redirect to="/session/expired" />
        )
    }

}

//check user type is workshop coordinator
function WorkshopRoutes({ component: ProComponent ,  ...rest}){

    // console.log("object",authed, userType)
    var userDetails = getUserDetailsFromStorage();

    if(userDetails != null){
        return(
            <Route
            { ...rest}
                render={
                    (props) => (userDetails.user_type === "Workshop Coordinator")?
                        <ProComponent {...props} />
                    :
                    <Redirect to="/session/401" /> 
                }
            />
        )
    }
    else{
        return(
            <Redirect to="/session/expired" />
        )
    }

}

//check user type is attendee
function AttendeeRoutes({ component: ProComponent , ...rest}){

    // console.log("object",authed, userType)
    var userDetails = getUserDetailsFromStorage();

    if(userDetails != null){
        return(
            <Route
            { ...rest}
                render={
                    (props) => (userDetails.user_type === "Attendee")?
                        <ProComponent {...props} />
                    :
                    <Redirect to="/session/401" /> 
                }
            />
        )
    }
    else{
        return(
            <Redirect to="/session/expired" />
        )
    }

}

//user and admin logged in check
function UserLoggedIn({ component: ProComponent , ...rest}){

    var userDetails = getUserDetailsFromStorage();

    if(userDetails == null){
        return(
            <Route
            { ...rest}
                render={
                    (props) => 
                        <ProComponent {...props} />
                }
            />
        )
    }
    else{
        
        if(userDetails.isAdmin){
            return(
                <Redirect to="/admin" />
            )
        }
        else{
            return(
                <Redirect to="/" />
            )
        }

    }

}

export{
    ResearcherRoutes,
    WorkshopRoutes,
    AttendeeRoutes,
    UserLoggedIn,
}