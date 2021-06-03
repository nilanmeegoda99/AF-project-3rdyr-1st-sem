import React, { Component, Fragment } from "react";
import {  Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from "react-router-dom";
import '../bootstrap.min.css';
// import '../index.css';

import Header from './common/Header';
import Footer from './common/Footer';
// import AboutUs from './';
import Login from "./common/login";
import Register from "./common/register";
import Home from "./common/Home";

class App extends Component{

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Router>
                <Header />
                    <main style={{ marginTop: '55px' }}>
                        <Container>
                            <Route exact path="/" component={Home} />
                            {/*<Route path="/Aboutus" component={AboutUs} />*/}

                            <Route path="/login" component={Login} />
                            <Route path="/register" component={Register} />

                        </Container>
                    </main>
                <Footer />
            </Router>
        )
    }

}

export default App;


