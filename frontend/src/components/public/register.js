import React, {Component} from 'react';
import axios from 'axios';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Loader from '../common/Loader';
import { Button, Grid, Typography } from '@material-ui/core'
import { withStyles } from "@material-ui/core/styles";
import { Autocomplete, Alert} from '@material-ui/lab';
import { userTypes } from '../../utils/Constants';

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
        name: '',
        email: '',
        contact_no: '',
        user_type: '',
        isAdmin: false,
        password: '',
    },
    variant: '',
    message: '',
    loading: false,
};
class Register extends Component {

    constructor(props){
        super(props);
        this.state = initialState;
        this.fromSubmit = this.fromSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSelection = this.handleSelection.bind(this);
        this.setSelectedValue = this.setSelectedValue.bind(this);
    }

    fromSubmit(e){
        e.preventDefault();

        this.setState({
            loading: true,
        })

        console.log(this.state);
        var messageRes = null;
        var variantRes = null;

        // axios.post('http://', data)
        // .then(res => {
            var res={
                status:200,
                data:{
                    success: true,
                    message: "Data Success"
                }
            }
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
        // })
        // .catch(error => {
        //     console.log(error);
        //     messageRes = error.message;
        //     variantRes = "danger";
        // })

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

    handleSelection = (e) => {
        var name = 'user_type';
        var value = e.target.value;
        var data = this.state.formData;

        data[name] = value

        this.setState({
            formData: data,
        })
        // console.log(this.state);
    }

    setSelectedValue = (name, value) => {

        var data = this.state.formData;
        data[name] = value;

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

                    <h1 className="mt-3 text-center">User Registration</h1>

                    {/* Loading */}
                    {
                        this.state.loading && <Loader />
                    }

                    <ValidatorForm onSubmit={this.fromSubmit}>

                        <Grid container alignItems="center" justify="center" direction="column">

                            <Grid item xs={12} md={12} className={classes.inputElement}>
                                <TextValidator
                                    className="mt-5"
                                    placeholder="Name"
                                    helperText="Enter Name"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    type="name"
                                    name="name"
                                    value={this.state.formData.name}
                                    onChange={(e) => this.handleChange(e)} 
                                    validators={['required']}
                                    errorMessages={['This field is required']}
                                />
                            </Grid>
                            
                            <Grid item xs={12} md={12} className={classes.inputElement}>
                                <TextValidator
                                    className="mt-4"
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
                                    placeholder="Contact Number"
                                    helperText="Enter Contact Number"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    type="text"
                                    name="contact_no"
                                    value={this.state.formData.contact_no}
                                    onChange={(e) => this.handleChange(e)} 
                                    validators={["required", "matchRegexp:^[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$"]}
                                    errorMessages={["Phone Number is required!","Please enter valid Phone Number(Eg:0772345678)"]}
                                />
                            </Grid>

                            <Grid item xs={12} md={12} className={classes.inputElement}>
                                <Autocomplete
                                        className="mt-4"
                                        fullWidth
                                        options={userTypes}
                                        getOptionLabel={(opt) => opt.value}
                                        name="user_type"
                                        size='small'
                                        // value={{value: this.state.formData.user_type}}
                                        onChange={(e,v) => this.setSelectedValue("user_type", v == null ? null : v.value) }
                                        renderInput={(params) =><TextValidator {...params} variant="outlined"
                                            placeholder="Select User Type"
                                            helperText="Select User Type"
                                            value={this.state.formData.user_type == '' ? '' : this.state.formData.user_type}
                                            validators={["required"]}
                                            errorMessages={["User Type is required!"]}
                                        /> }
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
                                    <a href="/login" className={classes.linkText}>Already have an Account ?</a>
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
                                        REGISTER
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

export default withStyles(styles)(Register);
