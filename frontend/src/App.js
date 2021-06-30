import "regenerator-runtime/runtime";
import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import './static/index.css';

import { ResearcherRoutes, WorkshopRoutes, AttendeeRoutes, UserLoggedIn, UserCommonRoutes, } 
from './routes/UserRouteFunctions';

import { SuperAdminRoutes, AdminCommonRoutes, EditorRoutes, ReviewerRoutes, } 
from './routes/AdminRouteFunctions';

// guest user components
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Home from "./components/public/Home";
import AboutUs from "./components/public/AboutUs";

import Login from "./components/public/Login";
import Register from "./components/public/Register";

import ResearchInstructions from "./components/users/guest/ResearchInstructions";
import Researches from "./components/users/guest/Researches";

import Workshops from "./components/users/guest/Workshops";
import WorkshopInstructions from "./components/users/guest/WorkshopInstructions";

import Downloads from "./components/users/guest/Downloads";
import AttendeeInstructions from "./components/users/guest/AttendeeInstructions";

//registered user components
import MyResearch from "./components/users/Research/MyResearch";
import CreateResearch from "./components/users/Research/CreateResearch";
import EditResearch from "./components/users/Research/EditResearch";
import ViewResearch from "./components/users/Research/ViewResearch";

import MyWorkshops from "./components/users/Workshop/MyWorkshops";
import ViewWorkshop from "./components/users/Workshop/ViewWorkshop";
import EditWorkshop from "./components/users/Workshop/EditWorkshop";
import CreateWorkshop from "./components/users/Workshop/CreateWorkshop";

import BookedConferences from "./components/users/Attendee/BookedConferences";
import CreateBookConference from "./components/users/Attendee/CreateBookConference";
import ViewBooked from "./components/users/Attendee/ViewBooked";

import ViewProfile from "./components/users/profile/ViewProfile";

//payment
import ViewPayment from "./components/users/Payment/ViewPayment";
import CreatePayment from "./components/users/Payment/CreatePayment";

// Admin components
import Dashboard from "./components/admin/Dashboard";
import AdminProfile from "./components/admin/AdminProfile";
import ConferenceDetails from "./components/admin/conference/ConferenceDetails";

//conferences  - Super Admin
import AllConferences from "./components/admin/conference/AllConferences";
import CreateConference from "./components/admin/conference/CreateConference";
import ConferenceSingleView from "./components/admin/conference/ConferenceSingleView";
import EditConferenceDetails from "./components/admin/conference/EditConferenceDetails";

//users - Super Admin
import AllUsers from "./components/admin/users/AllUsers";

//events
import ConferenceEvents from "./components/admin/conference/ConferenceEvents";
import CreateEvent from "./components/admin/conference/CreateEvent";
import EventSingleView from "./components/admin/conference/EventSingleView";
import EditEvent from "./components/admin/conference/EditEvent";

//researches
import AdminResearches from "./components/admin/research/AdminResearches";
import ResearchSingleView from "./components/admin/research/ResearchSingleView";

//workshops
import AdminWorkshops from "./components/admin/workshop/AdminWorkshops";
import WorkshopSingleView from "./components/admin/workshop/WorkshopSingleView";

//templates
import AllTemplates from "./components/admin/templates/AllTemplates";
import CreateTemplate from "./components/admin/templates/CreateTemplate";
import TemplateSingleView from "./components/admin/templates/TemplateSingleView";

// session imports
import NotFound from "./components/sessions/NotFound";
import NotAuthorized from "./components/sessions/NotAuthorized";
import TokenExpired from "./components/sessions/TokenExpired";

import AuthService from "./services/AuthService";

class App extends Component{

    constructor(props) {
        super(props);
        this.state={
            user:{
                authorized: false,
                isAdmin: false,
                user_type: null,
            }
        }
    }

    componentDidMount(){
        var authResult = AuthService.validateJWTToken();
        var uType = null;
        var is_Admin = false;
        var user_data = this.state.user;

        if(authResult != null){
            uType = authResult.user_type;
            is_Admin = authResult.isAdmin;

            user_data['authorized'] = true;
            user_data['isAdmin'] = is_Admin;
            user_data['user_type'] = uType;

            this.setState({
                user: user_data,
            })
        }
        // console.log("App Data", authResult);
        // console.log("App state", this.state);
    }

    render() {
        return(
            <Router>
               
                <main style={{ marginTop: '60px', }}>

                    <Header 
                        user={this.state.user}
                    />

                    <Switch>
                        {/* Guest user Routes */}
                        <Route exact path="/" component={Home} />
                        <Route exact path="/about" component={AboutUs} />

                        <Route exact path="/downloads" component={Downloads} />
                        <Route exact path="/research/instructions" component={ResearchInstructions} />
                        <Route exact path="/research/published" component={Researches} />
                        <Route exact path="/workshops/instructions" component={WorkshopInstructions} />
                        <Route exact path="/workshops/published" component={Workshops} />
                        <Route exact path="/attendee/instructions" component={AttendeeInstructions} />

                        
                        {/* Logged in user Routes */}
                        <UserCommonRoutes exact path="/user/profile" component={ViewProfile} />

                        {/* <UserCommonRoutes exact path="/user/payment/create" component={CreatePayment} /> */}
                        <UserCommonRoutes exact path="/user/payment/:id" component={ViewPayment} />

                        {/* Researcher */}
                        <ResearcherRoutes exact path="/researches/" component={MyResearch} />
                        <ResearcherRoutes exact path="/researches/create" component={CreateResearch} />
                        <ResearcherRoutes exact path="/researches/:id" component={ViewResearch} />
                        <ResearcherRoutes exact path="/researches/edit/:id" component={EditResearch} />

                        {/* Workshop Coordinator */}
                        <WorkshopRoutes exact path="/workshops/" component={MyWorkshops} />
                        <WorkshopRoutes exact path="/workshops/create" component={CreateWorkshop} />
                        <WorkshopRoutes exact path="/workshops/:id" component={ViewWorkshop} />
                        <WorkshopRoutes exact path="/workshops/edit/:id" component={EditWorkshop} />

                        {/* Attendee */}
                        <AttendeeRoutes exact path="/attendee/my" component={BookedConferences} />
                        <AttendeeRoutes exact path="/attendee/booking/create" component={CreateBookConference} />
                        <AttendeeRoutes exact path="/attendee/booking/:id" component={ViewBooked} />

                        {/* Admin Routes */}
                        {/* Common */}
                        <AdminCommonRoutes exact path="/admin" component={Dashboard}/>
                        <AdminCommonRoutes exact path="/admin/profile" component={AdminProfile}/>
                        <AdminCommonRoutes exact path="/admin/conference" component={ConferenceDetails}/>

                        {/* Super Admin */}
                        <SuperAdminRoutes exact path="/admin/conference/create" component={CreateConference}/>
                        <SuperAdminRoutes exact path="/admin/conferences" component={AllConferences}/>
                        <SuperAdminRoutes exact path="/admin/conferences/:id" component={ConferenceSingleView}/>
                        <SuperAdminRoutes exact path="/admin/conferences/edit/:id" component={EditConferenceDetails}/>
                        <SuperAdminRoutes exact path="/admin/users" component={AllUsers}/>

                        {/* Editor */}
                        <EditorRoutes exact path="/admin/events" component={ConferenceEvents} />
                        <EditorRoutes exact path="/admin/events/create" component={CreateEvent} />
                        <AdminCommonRoutes exact path="/admin/events/:id" component={EventSingleView} />
                        <EditorRoutes exact path="/admin/events/edit/:id" component={EditEvent} />

                        {/* Reviewer */}
                        <ReviewerRoutes exact path="/admin/workshops" component={AdminWorkshops} />
                        <ReviewerRoutes exact path="/admin/workshops/:id" component={WorkshopSingleView} />
                        <ReviewerRoutes exact path="/admin/researches" component={AdminResearches} />
                        <ReviewerRoutes exact path="/admin/researches/:id" component={ResearchSingleView} />
                        <ReviewerRoutes exact path="/admin/templates/" component={AllTemplates} />
                        <ReviewerRoutes exact path="/admin/templates/create" component={CreateTemplate} />
                        <ReviewerRoutes exact path="/admin/templates/:id" component={TemplateSingleView} />

                        {/* Uer / Admin login-register routes */}
                        <Route exact path="/login" component={ () => <Redirect to="/session/login"/>} />
                        <Route exact path="/register" component={ () => <Redirect to="/session/register"/>} />
                        
                        {/* Session Routes */}
                        <UserLoggedIn exact path="/session/login" component={Login} />
                        <Route exact path="/session/register" component={Register} />

                        <Route exact path="/session/401" component={NotAuthorized} />
                        <Route exact path="/session/404" component={NotFound} />
                        <Route exact path="/session/expired" component={TokenExpired} />
                        
                        <Route path="*" component={ () => <Redirect to="/session/404"/> } />
                        
                    </Switch>
                </main>
                
                <Footer />

            </Router>
        )
    }

}

export default App;


