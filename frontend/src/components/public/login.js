import React, {Component} from 'react';
import axios from 'axios';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Loader from '../common/Loader';
import { Button, Grid, Typography } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import { withStyles } from "@material-ui/core/styles";
import AuthService from '../../services/AuthService';

const styles = theme =>({

    inputElement:{
        paddingLeft: 10,
        paddingRight: 10,
        minWidth: '360px',
    },
    linkText:{
        textDecoration: 'none',
        '&:hover':{
            textDecoration: 'underline',
            color: '#DDC545'
        },
    },

});

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
        this.formSubmit = this.formSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    formSubmit(e){
        e.preventDefault();

        this.setState({
            loading: true,
        })

        // console.log(this.state);
        var messageRes = null;
        var variantRes = null;

        axios.post('http://localhost:5000/api/users/login', this.state.formData)
        .then(res => {
            
            // console.log(res);
            var userData = res.data;
            var token = res.data.token;

            AuthService.setUserDataToLocal(userData, token);
            
            if(userData.isAdmin){
                window.location.href = '/admin';
            }
            else{
                window.location.href = '/';
            }

        })
        .catch(error => {
            console.log(error);
            messageRes = error.message;
            variantRes = "error";
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

        const { classes } = this.props;

        return (
        
            <div className= 'py-3'>

                <div>

                    <h1 className="my-3 text-center">User Login</h1>

                    {/* Loading */}
                    {
                        this.state.loading && <Loader />
                    }

                    <ValidatorForm onSubmit={this.formSubmit}>

                        <Grid container alignItems="center" justify="center" direction="column">

                            <Grid item xs={12} md={12} className={classes.inputElement}>
                                <TextValidator
                                    className="mt-5"
                                    placeholder="Email"
                                    helperText="Enter Email"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    type="email"
                                    name="email"
                                    value={this.state.formData.email}
                                    onChange={(e) => this.handleChange(e)} 
                                    validators={['required', 'isEmail']}
                                    errorMessages={['This field is required', 'Email is not valid']}
                                />
                            </Grid>
                            
                            <Grid item xs={12} md={12} className={classes.inputElement}>
                                <TextValidator
                                    className="mt-4"
                                    placeholder="Password"
                                    helperText="Enter Password"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    type="password"
                                    name="password"
                                    value={this.state.formData.password}
                                    onChange={(e) => this.handleChange(e)} 
                                    validators={['required']}
                                    errorMessages={['This field is required']}
                                />
                            </Grid>

                            <Grid item xs={12} md={12} className={classes.inputElement}>
                                <div className="float-end mb-4">
                                    <a href="/register" className={classes.linkText}>Create New Account ?</a>
                                </div>
                            </Grid>

                            {
                                this.state.message != '' &&

                                <Grid item xs={12} md={12} >
                                    <Alert severity={this.state.variant} style={{ maxWidth:'360px'}}>
                                        <Typography>
                                            {this.state.message}
                                        </Typography>
                                    </Alert>
                                </Grid>
                            }
                        
                            <Grid item xs={12} md={12}>
                                <div className="text-center my-3">
                                    <Button variant="contained" color="primary" type="submit">
                                        LOGIN
                                    </Button>
                                </div>
                            </Grid>

                        </Grid>

                    </ValidatorForm>

                </div>

            </div>
        );
    }
}

export default withStyles(styles)(Login);