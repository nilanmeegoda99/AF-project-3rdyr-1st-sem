import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import './static/index.css';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Login from './components/public/Login';
import Register from './components/public/Register';
import Home from './components/public/Home';
import AboutUs from './components/public/AboutUs';

import NotFound404 from './components/sessions/NotFound404';

class App extends Component{

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Router>

                {
                    location.pathname != "/404" && <Header />
                }
                    <main style={{ marginTop: '60px' }}>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/about" component={AboutUs} />

                            <Route path="/login" component={Login} />
                            <Route path="/register" component={Register} />

                            <Route component={NotFound404} />

                        </Switch>
                    </main>

                {
                    location.pathname != "/register" && location.pathname != "/login" && <Footer />
                }

            </Router>
        )
    }

}

export default App;


