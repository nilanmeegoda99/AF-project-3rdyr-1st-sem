import React, { Component } from 'react'
import {
    Grid, Typography, Card, CardContent, Button, Chip, 
    Switch, FormControlLabel, FormGroup, Alert, CardMedia, Tooltip,
}
from '@material-ui/core';
import { Link } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import AuthService from '../../../services/AuthService';
import fileIcon1 from 'url:../../../../public/images/fileIcon1.png';

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
    showForm: false,
    showAttachments: false,

    formData: {
        time: '',
        date: '',
        notificationMessage: '',
    }
}

class WorkshopSingleView extends Component {

    constructor(props){
        super(props);
        this.state = initialState;
        this.showContent = this.showContent.bind(this);
        this.openAttachment = this.openAttachment.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
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

    formSubmit(e){

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

    openAttachment(){
        window.open(fileIcon1, '_blank');
    }

    componentDidMount(){

        var localStorageData = AuthService.getUserData();
        // console.log("User Data",localStorageData);

        var role = localStorageData.userData.user_type;

        this.setState({
            adminRole: role,
        });
    }

    render() {

        const { classes } = this.props;

        return (
            <div>
                <Grid container alignItems="center" justify="center" direction="column">

                    <Grid item xs={12} md={12}>
                        <Card className={classes.detailsCard}>
                            <CardContent>
                                <Typography variant="h4" >WORKSHOP : Title</Typography>
                                <Typography variant="h4" >CONFERENCE : Title</Typography>
                                <hr />
                                <Typography variant="body1" className={classes.detailsRow}>
                                    <b>Date</b>: 2020/01/01
                                </Typography>

                                <Typography variant="body1" className={classes.detailsRow}>
                                    <b>Time</b>: 11.00 AM
                                </Typography>

                                <Typography variant="body1" className={classes.detailsRow}>
                                    <b>Description</b>: Contrary to popular belief, Lorem Ipsum is not simply random text. 
                                    It has roots in a piece of classical Latin literature from 45 BC, making it over 
                                    2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in 
                                    Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem 
                                </Typography>

                                <Typography variant="body1" className={classes.detailsRow}>
                                    <b>Created By</b>: Amal Perera
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
                                                onClick={ this.openAttachment }
                                            />
                                        </Card>
                                    </Tooltip>
                                }
                                
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
                                    this.state.adminRole == 'Reviewer' &&
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
                                                label={ this.state.showForm ? "Show Form" : "Hide Form" }
                                            />
                                        </FormGroup>
                                    </>
                                }

                            </CardContent>                            
                        </Card>
                    </Grid>

                { this.state.showForm && this.state.approved == false &&
                    <Grid item xs={12} md={12} className={classes.formGrid} >
                        <ValidatorForm onSubmit={this.formSubmit}>
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
                                        type="text"
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

                { this.state.approved && this.state.showForm &&

                    <Grid item xs={12} md={12} className={classes.formGrid}>
                        <ValidatorForm onSubmit={this.formSubmit}>
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

                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(WorkshopSingleView);