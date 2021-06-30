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
    formGrid:{
        margin: 20,
        padding: 20,
        backgroundColor: '#F3F5F4',
        borderRadius: 20,
    },
    
});

const initialState = {
    adminRole: '',
    booking: {},
    cTitle: '',
}

class ViewBooked extends Component {

    constructor(props){
        super(props);
        this.state = initialState;
    }


    async componentDidMount(){

        var localStorageData = AuthService.getUserData();
        // console.log("User Data",localStorageData);

        var role = localStorageData.userData.user_type;

        var id = this.props.match.params.id;

        var messageRes = '';
        var variantRes = '';
        var title = '';
        var snackbarRes = true;
        var bookingOne = {};

        // get data from db
        await axios.get('http://localhost:5000/api/bookings/'+id)
        .then(res => {
            console.log(res);
            
            if(res.status == 200){
                if(res.data.success){
                    snackbarRes = false;
                    bookingOne = res.data.booking;
                    title = bookingOne.conference.title;
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
            booking: bookingOne,
            variant: variantRes,
            snackbar: snackbarRes,
            cTitle: title,
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
                                <Typography variant="h4" className="text-center"><u>USER BOOKING</u></Typography>
                                <Typography variant="h4" >CONFERENCE : {( this.state.cTitle+ "").toUpperCase() }
                                </Typography>
                                <hr />
                                <Typography variant="body1" className={classes.detailsRow}>
                                    <b>Date</b>: { this.state.booking.date }
                                </Typography>

                                <Typography variant="body1" className={classes.detailsRow}>
                                    <b>Status</b>: { this.state.booking.status }
                                </Typography>
                                <Typography variant="body1" className={classes.detailsRow}>
                                    <b>Token</b>: { this.state.booking.token }
                                </Typography>
                                <Typography variant="body1" className={classes.detailsRow}>
                                    <b>Payed</b>
                                </Typography>
                                    {
                                        this.state.booking.isPaid ? 
                                        <Chip
                                            icon={<CheckCircleIcon style={{ color: '#018E17' }} />}
                                            label="Paid"
                                            clickable={false}
                                            style={{ color: '#018E17' }}
                                            variant="outlined"
                                        />
                                        :
                                        <Chip
                                            icon={<CancelIcon />}
                                            label="Not Paid"
                                            clickable={false}
                                            color="secondary"
                                            variant="outlined"
                                        />
                                    }
                                    
                                <br />
                                <br />

                                { this.state.booking.isPaid && 

                                    <Typography variant="body1" className={classes.detailsRow}>
                                        <Link to={"/user/payment/"+this.state.booking.payment}>
                                            View Payment
                                        </Link>
                                    </Typography>
                                }

                            </CardContent>                            
                        </Card>
                    </Grid>

                    {
                        this.state.booking.isPaid == false &&
                        <Grid item xs={12} md={12}>
                            <Card className={classes.detailsCard}>
                                <CardContent>
                                    <CreatePayment paymentDetails={this.state.booking}/>
                                </CardContent>                            
                            </Card>
                        </Grid>
                    }

                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(ViewBooked);