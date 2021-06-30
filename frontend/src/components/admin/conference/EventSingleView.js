import React, { Component } from 'react'
import {
    Grid, Typography, Card, CardContent, Button, Chip, 
    Switch, FormControlLabel, FormGroup, Snackbar,
}
from '@material-ui/core';
import { Link } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";
import axios from 'axios';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import AuthService from '../../../services/AuthService';
import { Alert } from '@material-ui/lab';

const styles = theme =>({

    detailsCard:{
        margin: 10,
        padding: 20,
        backgroundColor: '#FBFBFB',
    },
    detailsRow:{
        marginBottom: 10,
    }

});

const initialState = {
    adminRole: '',
    approved:false,
    snackbar: false,
    message: '',
    variant:'',
    approved: false,
    id:'',
    conferenceTitle: '',
    event:{},
}

class EventSingleView extends Component {

    constructor(props){
        super(props);
        this.state = initialState;
        this.setApproveStatus = this.setApproveStatus.bind(this);
    }

    async setApproveStatus(){

        var approved_status = this.state.approved;
        var messageRes = '';
        var variantRes = '';

        if(approved_status){
            approved_status = false;
        }
        else{
            approved_status = true;
        }

        var data = {
            is_Approved: approved_status,
        }

        await axios.put('http://localhost:5000/api/events/approve/'+this.state.id, data)
        .then(res => {
            console.log(res);
            if(res.status == 200){
                if(res.data.success){
                    variantRes = "success";
                    messageRes = "Approve Status Changed";
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
            approved:approved_status,
            message: messageRes,
            variant: variantRes,
            snackbar: true,
        })

    }

    closeSnackBar = (event, response) => {
        this.setState({
            snackbar: false,
        })
    }

    async componentDidMount(){

        var localStorageData = AuthService.getUserData();
        // console.log("User Data",localStorageData);

        var role = localStorageData.userData.user_type;

        var eventsOne = {};
        var messageRes = '';
        var variantRes = '';
        var snackbarRes = true;
        var conference_Title = '';
        var approvedState = false;

        var eId = this.props.match.params.id;

        //get data from db
        await axios.get('http://localhost:5000/api/events/'+eId)
        .then(res => {
            console.log(res);
            if(res.status == 200){
                if(res.data.success){
                    variantRes = "success";
                    eventsOne = res.data.event;
                    snackbarRes = false;
                    conference_Title = eventsOne.conference.title;
                    approvedState = eventsOne.is_Approved;
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
            event: eventsOne,
            variant: variantRes,
            snackbar: snackbarRes,
            id: eId,
            conferenceTitle:conference_Title,
            approved: approvedState,
        });

        // console.log(this.state);
        
    }

    render() {

        const { classes } = this.props;

        return (
            <div>
                <Grid container alignItems="center" justify="center" direction="column">

                    <Grid item xs={12} md={12}>
                        <Card className={classes.detailsCard}>
                            <CardContent>
                                <Typography variant="h4" >EVENT :
                                {( this.state.event.title+ "").toUpperCase() }</Typography>
                                
                                <Typography variant="h4" >CONFERENCE :
                                {( this.state.conferenceTitle+ "").toUpperCase() }</Typography>
                                <hr />
                                <Typography variant="body1" className={classes.detailsRow}>
                                    <b>Start Date</b>: {this.state.event.startDate}
                                </Typography>

                                <Typography variant="body1" className={classes.detailsRow}>
                                    <b>End Date</b>: {this.state.event.endDate}
                                </Typography>

                                <Typography variant="body1" className={classes.detailsRow}>
                                    <b>Description</b>: {this.state.event.description}
                                </Typography>

                                <Typography variant="body1" className={classes.detailsRow}>
                                    <b>Other Details</b>: {this.state.event.otherDetails}
                                </Typography>
                                
                                <b>Status</b>: &ensp;
                                {/* <Typography variant="body1" className={classes.detailsRow}> */}
                                {
                                    this.state.approved ? 
                                    <Chip
                                        icon={<CheckCircleIcon style={{ color: '#018E17' }} />}
                                        label="Approved"
                                        clickable={false}
                                        style={{ color: '#018E17' }}
                                        variant="outlined"
                                    />
                                    :
                                    <Chip
                                        icon={<CancelIcon />}
                                        label="Not Approved"
                                        clickable={false}
                                        color="secondary"
                                        variant="outlined"
                                    />
                                }
                                {/* </Typography> */}

                                { 
                                    this.state.adminRole == 'Super Admin' &&
                                    <>
                                        <Typography variant="body1" className="mt-4">
                                            <b>Change Status</b>
                                        </Typography>
                                        <FormGroup row>
                                            <FormControlLabel
                                                control={
                                                    <Switch 
                                                        checked={this.state.approved}
                                                        onChange={this.setApproveStatus}
                                                        color="primary"
                                                        label="Primary"
                                                    />
                                                }
                                                label={ this.state.approved ? "Approved" : "Not Approved" }
                                            />
                                        </FormGroup>
                                    </>
                                }
                                { 
                                    this.state.adminRole == 'Editor' &&
                                    
                                    <Link to={"/admin/events/edit/"+this.state.id}>
                                        <Button 
                                            className="mt-3 float-end"
                                            // onClick={() => window.location.href = "/admin/conferences/edit/1"}
                                            variant="contained"
                                            color="primary"
                                        >
                                            Edit
                                        </Button>
                                    </Link>
                                }

                            </CardContent>                            
                        </Card>
                    </Grid>

                    { this.state.message != '' &&
                        <Snackbar open={this.state.snackbar}  autoHideDuration={2500} onClose={this.closeSnackBar} name="snackBar">
                            <Alert severity={this.state.variant} onClose={this.closeSnackBar} >{this.state.message}</Alert>
                        </Snackbar>
                    }

                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(EventSingleView);