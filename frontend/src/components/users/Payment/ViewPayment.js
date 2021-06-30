import React, { Component } from 'react'
import {
    Grid, Typography, Card, CardContent, Button, Chip, Snackbar,
    Switch, FormControlLabel, FormGroup, CardMedia, Tooltip,
}
from '@material-ui/core';
import { Link } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import AuthService from '../../../services/AuthService';
import fileIcon1 from 'url:../../../../public/images/fileIcon1.png';
import { Alert } from '@material-ui/lab';
import axios from 'axios';
import CreatePayment from '../Payment/CreatePayment';

const styles = theme =>({

    detailsCard:{
        margin: 10,
        padding: 20,
        backgroundColor: '#FBFBFB',
    },
    detailsRow:{
        marginBottom: 10,
    },
    
});

const initialState = {
    adminRole: '',
    payment: {},
    user: {},
}

class ViewPayment extends Component {

    constructor(props){
        super(props);
        this.state = initialState;
    }


    async componentDidMount(){

        var localStorageData = AuthService.getUserData();
        var role = localStorageData.userData.user_type;
        var id = this.props.match.params.id;

        var messageRes = '';
        var variantRes = '';
        var userDetails = {};
        var snackbarRes = true;
        var paymentOne = {};

        // get data from db
        await axios.get('http://localhost:5000/api/payments/'+id)
        .then(res => {
            console.log(res);
            
            if(res.status == 200){
                if(res.data.success){
                    snackbarRes = false;
                    paymentOne = res.data.payment;
                    userDetails = res.data.payment.user;
                }
                else{
                    messageRes = res.data.message;
                    variantRes = "error";
                }
            }
            else{
                messageRes = res.data.message;
                variantRes = "error";
            }
        })
        .catch(error => {
            console.log("Error:",error)
            variantRes = "error";
            messageRes = error.message;
        })
        
        this.setState({
            adminRole: role,
            message: messageRes,
            payment: paymentOne,
            variant: variantRes,
            snackbar: snackbarRes,
            user: userDetails,
        })
    }

    render() {

        const { classes } = this.props;

        return (
            <div>
                <Grid container alignItems="center" justify="center" direction="column">

                    <Grid item xs={12} md={12}>
                        <Card className={classes.detailsCard}>
                            <CardContent>
                                <Typography variant="h4" className="text-center"><u>USER PAYMENT</u></Typography>
                                <hr />
                                <br />
                                <u>Payment Details</u>
                                <br />
                                <Typography variant="body1" className={classes.detailsRow}>
                                    <b>Date</b>: { this.state.payment.date }
                                </Typography>

                                <Typography variant="body1" className={classes.detailsRow}>
                                    <b>Time</b>: { this.state.payment.time }
                                </Typography>
                                <Typography variant="body1" className={classes.detailsRow}>
                                    <b>Details</b>: { this.state.payment.details }
                                </Typography>
                                <Typography variant="body1" className={classes.detailsRow}>
                                    <b>Type</b>: { this.state.payment.type }
                                </Typography>
                                <br />
                                <u>User Details</u>
                                <br />
                                <Typography variant="body1" className={classes.detailsRow}>
                                    <b>Name</b>: { this.state.user.name }
                                </Typography>
                                <Typography variant="body1" className={classes.detailsRow}>
                                    <b>Email</b>: { this.state.user.email }
                                </Typography>
                                <Typography variant="body1" className={classes.detailsRow}>
                                    <b>Contact Number</b>: { this.state.user.contact_no }
                                </Typography>

                            </CardContent>                            
                        </Card>
                    </Grid>

                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(ViewPayment);
