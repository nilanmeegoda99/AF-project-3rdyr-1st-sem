import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import AuthService from '../services/AuthService'

//get admin user details from local storage
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

//check user type is logged in
function AdminCommonRoutes({ component: ProComponent, ...rest}){

    // console.log("object",authed, userType)
    var userDetails = getUserDetailsFromStorage();

    if(userDetails != null){
        return(
            <Route
            { ...rest}
                render={
                    (props) => (userDetails.isAdmin)?
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

//check user type is super admin
function SuperAdminRoutes({ component: ProComponent, ...rest}){

    // console.log("object",authed, userType)
    var userDetails = getUserDetailsFromStorage();

    if(userDetails != null){
        return(
            <Route
            { ...rest}
                render={
                    (props) => (userDetails.user_type === "Super Admin")?
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

//check user type is editor
function EditorRoutes({ component: ProComponent, ...rest}){

    // console.log("object",authed, userType)
    var userDetails = getUserDetailsFromStorage();

    if(userDetails != null){
        return(
            <Route
            { ...rest}
                render={
                    (props) => (userDetails.user_type === "Editor" || userDetails.user_type === "Super Admin")?
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

//check user type is reviewer
function ReviewerRoutes({ component: ProComponent, ...rest}){

    // console.log("object",authed, userType)
    var userDetails = getUserDetailsFromStorage();

    if(userDetails != null){
        return(
            <Route
            { ...rest}
                render={
                    (props) => (userDetails.user_type === "Reviewer" || userDetails.user_type === "Super Admin")?
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


export{
    SuperAdminRoutes,
    AdminCommonRoutes,
    EditorRoutes,
    ReviewerRoutes,
}
