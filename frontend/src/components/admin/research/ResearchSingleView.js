import React, { Component } from 'react'
import {
    Grid, Typography, Card, CardContent, Button, Chip, 
    Switch, FormControlLabel, FormGroup, CardMedia, Tooltip, Snackbar,
}
from '@material-ui/core';
import { Link } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import AuthService from '../../../services/AuthService';
import fileIcon1 from 'url:../../../../public/images/fileIcon1.png';

import axios from 'axios';
import { Alert } from '@material-ui/lab';

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
    attachmentCard:{
        padding: 10,
        marginTop: 20,
        marginBottom: 20,
        width: '120px',
        height: '120px',
        '&:hover':{
            cursor: 'pointer',
            backgroundColor: '#E7F5FF',
            opacity: '0.5',
        },
    },
    
});

const initialState = {
    adminRole: '',
    approved: false,
    paid: false,
    showForm: false,
    showAttachments: false,

    isPaid: false,
    completed: false,
    
    snackbar: false,
    variant: '',
    message: '',
    id: '',
    createdBy: {},
    conferenceTitle: '',
    
    research: {},
    
    formData: {
        time: '',
        date: '',
        notificationMessage: '',
    }
}

class ResearchSingleView extends Component {

    constructor(props){
        super(props);
        this.state = initialState;
        this.showContent = this.showContent.bind(this);
        this.openAttachment = this.openAttachment.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.formSubmitApprove = this.formSubmitApprove.bind(this);
        this.formSubmitReject = this.formSubmitReject.bind(this);
        this.updateResearchDetails = this.updateResearchDetails.bind(this);
        this.changeCompletedStatus = this.changeCompletedStatus.bind(this);
        this.closeSnackBar = this.closeSnackBar.bind(this);
    }

    async changeCompletedStatus(){

        var res = false;
        var res1 = this.state.completed;

        if(res1){
            res = false;
        }
        else{
            res = true;
        }
        
        var messageRes = '';
        var variantRes = '';
        var snackbarRes = true;

        var data = {
            completed: res,
        };
        
        await axios.put('http://localhost:5000/api/researches/complete/'+this.state.id, data)
        .then(res => {
            // console.log(res);
            
            if(res.status == 200){
                if(res.data.success){
                    messageRes = res.data.message;
                    variantRes = "success";

                    setTimeout(() => {
                        window.location.reload(false);
                    }, 2000)

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
            snackbar: snackbarRes,
            message: messageRes,
            variant: variantRes,
            completed:res,
        })

    }

    showContent = (name) => {

        var show_status = null;

        if(name === 'form'){
            show_status = this.state.showForm;
            if(show_status){
                show_status = false;
            }
            else{
                show_status = true;
            }
            this.setState({
                showForm:show_status,
            })
        }
        else{
            show_status = this.state.showAttachments;
            if(show_status){
                show_status = false;
            }
            else{
                show_status = true;
            }
            this.setState({
                showAttachments:show_status,
            })
        }

    }

    closeSnackBar = (event, response) => {
        this.setState({
            snackbar: false,
        })
    }

    async updateResearchDetails(){

        var data = this.state.formData;
        var submitData = {
            date: data.date,
            time: data.time,
            is_Approved: true,
        };
        
        console.log("a",submitData);

        var messageRes = '';
        var variantRes = '';
        var snackbarRes = true;

        await axios.put('http://localhost:5000/api/researches/approve/'+this.state.id,submitData)
        .then(res => {
            // console.log(res);
            
            if(res.status == 200){
                if(res.data.success){
                    snackbarRes = false;
                    window.location.reload(false);
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
            snackbar: snackbarRes,
            message: messageRes,
            variant: variantRes,
        })

    }

    async formSubmitApprove(e){
        e.preventDefault();
        
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

        var data = this.state.formData;
        var submitData = {
            title: 'Research Submission Approved - '+ this.state.research.title,
            message: data.notificationMessage,
            date: date,
            time: time,
            user: this.state.createdBy._id,
        };
        
        // console.log(submitData);

        var messageRes = '';
        var variantRes = '';
        var snackbarRes = true;

        await axios.post('http://localhost:5000/api/notifications',submitData)
        .then(res => {
            // console.log(res);
            
            if(res.status == 201){
                if(res.data.success){
                    messageRes = res.data.message;
                    variantRes = "success";
                    snackbarRes = false;
                    this.updateResearchDetails(submitData);
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
            snackbar: snackbarRes,
            message: messageRes,
            variant: variantRes,
        })
    }

    async formSubmitReject(e){
        e.preventDefault();
        
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

        var data = this.state.formData;
        var submitData = {
            title: 'Research Submission Rejected - '+ this.state.research.title,
            message: data.notificationMessage,
            date: date,
            time: time,
            user: this.state.createdBy._id,
        };
        
        console.log("s",submitData);

        var messageRes = '';
        var variantRes = '';
        var snackbarRes = true;

        await axios.post('http://localhost:5000/api/notifications',submitData)
        .then(res => {
            console.log(res);
            
            if(res.status == 201){
                if(res.data.success){
                    messageRes = res.data.message;
                    variantRes = "success";
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
            snackbar: snackbarRes,
            message: messageRes,
            variant: variantRes,
        })
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

    openAttachment(attachment){
        window.open("http://localhost:5000/"+attachment , '_blank');
    }

    async componentDidMount(){

        var localStorageData = AuthService.getUserData();
        // console.log("User Data",localStorageData);

        var role = localStorageData.userData.user_type;
        var id = this.props.match.params.id;

        var messageRes = '';
        var variantRes = '';
        var snackbarRes = true;
        var approved_res = false;
        var researchOne = {};
        var user = '';
        var title = '';
        var completedRes = false;

        //get data from db
        await axios.get('http://localhost:5000/api/researches/'+id)
        .then(res => {
            console.log(res);
            
            if(res.status == 200){
                if(res.data.success){
                    snackbarRes = false;
                    researchOne = res.data.research;
                    approved_res = researchOne.is_Approved;
                    completedRes = researchOne.completed;
                    title = researchOne.conference.title;
                    user = researchOne.user;
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
            research: researchOne,
            variant: variantRes,
            snackbar: snackbarRes,
            conferenceTitle: title,
            createdBy: user,
            approved: approved_res,
            id: id,
            completed: completedRes,
        })

        console.log(this.state);

    }

    render() {

        const { classes } = this.props;

        return (
            <div>
                <Grid container alignItems="center" justify="center" direction="column">

                    <Grid item xs={12} md={12}>
                        <Card className={classes.detailsCard}>
                            <CardContent>
                            <Typography variant="h4" >RESEARCH : 
                                {( this.state.research.title+ "").toUpperCase() }</Typography>

                                <Typography variant="h4" >CONFERENCE :
                                {( this.state.conferenceTitle+ "").toUpperCase() }</Typography>

                                <hr />
                                { this.state.approved && 
                                    <>
                                    <Typography variant="body1" className={classes.detailsRow}>
                                        <b>Date</b>: { this.state.research.date }
                                    </Typography>

                                    <Typography variant="body1" className={classes.detailsRow}>
                                        <b>Time</b>:  { this.state.research.time }
                                    </Typography>
                                    </>
                                }

                                <Typography variant="body1" className={classes.detailsRow}>
                                    <b>Description</b>: { this.state.research.description }
                                    </Typography>

                                <Typography variant="body1" className={classes.detailsRow}>
                                    <b>Created By</b>: <br />
                                            Name: { this.state.createdBy.name } <br />
                                            Email: { this.state.createdBy.email } <br />
                                            Contact Number: { this.state.createdBy.contact_no } <br />
                                </Typography>
                                

                                <Typography variant="body1" className="mt-4">
                                    <b>Attachments</b>
                                </Typography>
                                <FormGroup row>
                                    <FormControlLabel
                                        control={
                                            <Switch 
                                                checked={this.state.showAttachments}
                                                onChange={() => this.showContent("attachments")}
                                                color="primary"
                                                label="Primary"
                                            />
                                        }
                                        label={ this.state.showAttachments ? "Show Attachments" : "Hide Attachments" }
                                    />
                                </FormGroup>
                                {
                                    this.state.showAttachments &&
                                    <Tooltip title="View Attachment" arrow>
                                        <Card className={classes.attachmentCard}>
                                            <CardMedia
                                                component="img"
                                                image={fileIcon1}
                                                onClick={ () => this.openAttachment(this.state.research.attachment) }
                                            />
                                        </Card>
                                    </Tooltip>
                                }
                                
                                <b>Paid</b>&ensp;
                                {
                                    this.state.research.is_Paid ? 
                                    <Chip
                                        icon={<CheckCircleIcon style={{ color: '#018E17' }} />}
                                        label="Yes"
                                        clickable={false}
                                        style={{ color: '#018E17' }}
                                        variant="outlined"
                                    />
                                    :
                                    <Chip
                                        icon={<CancelIcon />}
                                        label="No"
                                        clickable={false}
                                        color="secondary"
                                        variant="outlined"
                                    />
                                }
                                <br />
                                
                                <br />

                                <b>Status</b>&ensp;
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
                                <br />
                                <br />
                                <b>Completed</b>&ensp;
                                {
                                    this.state.research.completed ? 
                                    <Chip
                                        icon={<CheckCircleIcon style={{ color: '#018E17' }} />}
                                        label="Yes"
                                        clickable={false}
                                        style={{ color: '#018E17' }}
                                        variant="outlined"
                                    />
                                    :
                                    <Chip
                                        icon={<CancelIcon />}
                                        label="No"
                                        clickable={false}
                                        color="secondary"
                                        variant="outlined"
                                    />
                                }
                                <br />

                                { 
                                    this.state.adminRole == 'Reviewer' && this.state.approved == false &&
                                    <>
                                        <Typography variant="body1" className="mt-4">
                                            <b>Change Status</b>
                                        </Typography>
                                        <FormGroup row>
                                            <FormControlLabel
                                                control={
                                                    <Switch 
                                                        checked={this.state.showForm}
                                                        onChange={() => this.showContent("form")}
                                                        color="primary"
                                                        label="Primary"
                                                    />
                                                }
                                                label={ this.state.showForm ? "Show Approve Form" : "Show Reject Form" }
                                            />
                                        </FormGroup>
                                    </>
                                }

                                
                                {/* complete research */}
                                {
                                    this.state.research.is_Paid && this.state.approved &&

                                    <>
                                        <Typography variant="body1" className="mt-4">
                                            <b>Payment</b>
                                        </Typography>
                                        <Link to={"/user/payment/"+this.state.research.payment} >View Payment</Link>

                                        <Typography variant="body1" className="mt-4">
                                            <b>Change Completed Status</b>
                                        </Typography>
                                        <FormGroup row>
                                            <FormControlLabel
                                                control={
                                                    <Switch 
                                                        checked={this.state.completed}
                                                        onChange={() => this.changeCompletedStatus()}
                                                        color="primary"
                                                        label="Primary"
                                                    />
                                                }
                                                label={ this.state.completed ? "Completed" : "Not Completed" }
                                            />
                                        </FormGroup>
                                    </>

                                }

                            </CardContent>                            
                        </Card>
                    </Grid>

                { this.state.showForm == false && this.state.approved == false && this.state.adminRole == 'Reviewer' &&
                    <Grid item xs={12} md={12} className={classes.formGrid} >
                        <ValidatorForm onSubmit={this.formSubmitApprove}>
                            <Grid container>
                                <Grid item xs={12} md={12}>
                                    <Typography variant="h4">
                                        Approve Form
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} md={12}>
                                    <TextValidator
                                        className="mt-4 mx-2"
                                        placeholder="Message to User"
                                        helperText="Enter Message"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        type="text"
                                        name="notificationMessage"
                                        value={this.state.formData.notificationMessage}
                                        onChange={(e) => this.handleChange(e)} 
                                        validators={['required']}
                                        errorMessages={['This field is required']}
                                    />
                                </Grid>

                                <Grid item xs={12} md={12}>
                                    <TextValidator
                                        className="mt-4 mx-2"
                                        placeholder="Time"
                                        helperText="Enter Time"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        type="time"
                                        name="time"
                                        value={this.state.formData.time}
                                        onChange={(e) => this.handleChange(e)} 
                                        validators={['required']}
                                        errorMessages={['This field is required']}
                                    />
                                </Grid>

                                <Grid item xs={12} md={12}>
                                    <TextValidator
                                        className="mt-4 mx-2"
                                        placeholder="Date"
                                        helperText="Enter Date"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        type="date"
                                        name="date"
                                        value={this.state.formData.date}
                                        onChange={(e) => this.handleChange(e)} 
                                        validators={['required']}
                                        errorMessages={['This field is required']}
                                    />
                                </Grid>

                                <Grid item xs={12} md={12}>
                                    <div className="text-center my-3">
                                        <Button variant="contained" color="primary" type="submit">
                                            Approve
                                        </Button>
                                    </div>
                                </Grid>
                            </Grid>
                        </ValidatorForm>
                    </Grid>
                }

                { this.state.approved == false && this.state.showForm && this.state.adminRole == 'Reviewer' &&

                    <Grid item xs={12} md={12} className={classes.formGrid}>
                        <ValidatorForm onSubmit={this.formSubmitReject}>
                            <Grid container>
                                <Grid item xs={12} md={12}>
                                    <Typography variant="h4">
                                        Rejection Form
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} md={12}>
                                    <TextValidator
                                        className="mt-4 mx-2"
                                        placeholder="Reason for Reject"
                                        helperText="Enter Message"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        type="text"
                                        name="notificationMessage"
                                        value={this.state.formData.notificationMessage}
                                        onChange={(e) => this.handleChange(e)} 
                                        validators={['required']}
                                        errorMessages={['This field is required']}
                                    />
                                </Grid>

                                <Grid item xs={12} md={12}>
                                    <div className="text-center my-3">
                                        <Button variant="contained" color="primary" type="submit">
                                            Reject
                                        </Button>
                                    </div>
                                </Grid>

                            </Grid>
                        </ValidatorForm>
                    </Grid>
                }

                {
                    this.state.message != '' &&   
                    <Snackbar open={this.state.snackbar}  autoHideDuration={2500} onClose={this.closeSnackBar} name="snackBar">
                        <Alert severity={this.state.variant} onClose={this.closeSnackBar} >{this.state.message}</Alert>
                    </Snackbar>
                }

                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(ResearchSingleView);

