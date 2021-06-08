import React, {Component} from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import Loader from '../common/Loader';

const initialState = {
    formData: {
        email: '',
        password: '',
    },
    variant: '',
    message: '',
    loading: false,
};
class Login extends Component {

    constructor(props){
        super(props);
        this.state = initialState;
        this.fromSubmit = this.fromSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    fromSubmit(e){
        e.preventDefault();

        this.setState({
            loading: true,
        })

        console.log(this.state);
        var messageRes = null;
        var variantRes = null;

        axios.post('http://', data)
        .then(res => {
            // var res={
            //     status:200,
            //     data:{
            //         success: true,
            //         message: "Data Success"
            //     }
            // }
            if(res.status == 200){
                if(res.data.success){
                    messageRes = res.data.message;
                    variantRes = "success";
                }
                else{
                    messageRes = res.data.message;
                    variantRes = "danger";
                }
            }
            else{
                messageRes = res.data.message;
                variantRes = "danger";
            }
        })
        .catch(error => {
            console.log(error);
            messageRes = error.message;
            variantRes = "danger";
        })

        setTimeout(() => {
            this.setState({
                message: messageRes,
                variant: variantRes,
                loading: false,  
            })
        }, 2000);

    }

    handleChange = (e) => {
        var name = e.target.name;
        var value = e.target.value;
        var data = this.state.formData;

        data[name] = value

        this.setState({
            formData: data,
        })
        // console.log(this.state);
    }

    render() {
        return (
            <div>
                <Container className='py-3'>
                    
                <h1 className="text-center mt-3">User Login</h1>

                {/* Loading */}
                {
                    this.state.loading && <Loader />
                }

                <Row className="justify-content-md-center mt-3">
                    <Col xs={12} md={6}>
                        <Form onSubmit={this.fromSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email Address</Form.Label>
                                    <Form.Control 
                                        type="email" 
                                        placeholder="Enter Email"
                                        name="email"
                                        value={this.state.formData.email}
                                        onChange={(e) => this.handleChange(e)} 
                                        required/>

                                    <Form.Text className="text-muted">
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    placeholder="Password"
                                    name="password"
                                    value={this.state.formData.password}
                                    onChange={(e) => this.handleChange(e)}  
                                    required />
                            </Form.Group>

                            <a href="/register">Create New Account ?</a>

                            {
                                this.state.message != '' &&
                                <Alert variant={this.state.variant}>
                                    {this.state.message}
                                </Alert>
                            }
                        
                            <div className="text-center">
                                <Button variant="primary" type="submit">
                                    LOGIN
                                </Button>
                            </div>

                        </Form>
                    </Col>
                </Row>

                </Container>
            </div>
        );
    }
}

export default Login;