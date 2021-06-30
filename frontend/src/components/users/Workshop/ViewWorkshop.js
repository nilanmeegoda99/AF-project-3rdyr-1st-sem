import React, { Component } from 'react'
import {
    Grid, Typography, Card, CardContent, Button, Chip, 
    Switch, FormControlLabel, FormGroup, CardMedia, Tooltip, Snackbar
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
    approved: false,
    showAttachments: false,
    snackbar: false,
    variant: '',
    message: '',
    id: '',
    createdBy: '',
    conferenceTitle: '',
    
    workshop: {},
    image: null,

}

class ViewWorkshop extends Component {

    constructor(props){
        super(props);
        this.state = initialState;
        this.showContent = this.showContent.bind(this);
        this.openAttachment = this.openAttachment.bind(this);
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

    openAttachment(attachment){
        window.open("http://localhost:5000/"+attachment , '_blank');
    }

    async componentDidMount(){

        var id = this.props.match.params.id;

        var messageRes = '';
        var variantRes = '';
        var snackbarRes = true;
        var approved_res = false;
        var workshopOne = {};
        var user = '';
        var title = '';

        //get data from db
        await axios.get('http://localhost:5000/api/workshops/'+id)
        .then(res => {
            console.log(res);
            
            if(res.status == 200){
                if(res.data.success){
                    snackbarRes = false;
                    workshopOne = res.data.workshop;
                    approved_res = workshopOne.is_Approved;
                    title = workshopOne.conference.title;
                    user = workshopOne.user.email;
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
            message: messageRes,
            workshop: workshopOne,
            variant: variantRes,
            snackbar: snackbarRes,
            conferenceTitle: title,
            createdBy: user,
            approved: approved_res,
            id: id,
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
                                <Typography variant="h4" >WORKSHOP : 
                                {( this.state.workshop.title+ "").toUpperCase() }</Typography>

                                <Typography variant="h4" >CONFERENCE : 
                                {( this.state.conferenceTitle+ "").toUpperCase() }</Typography>

                                <hr />
                                {
                                    this.state.approved &&
                                    <>
                                        <Typography variant="body1" className={classes.detailsRow}>
                                            <b>Scheduled Date</b>: { this.state.workshop.date}
                                        </Typography>

                                        <Typography variant="body1" className={classes.detailsRow}>
                                            <b>Scheduled Time</b>: { this.state.workshop.time }
                                        </Typography>
                                    </>
                                }

                                <Typography variant="body1" className={classes.detailsRow}>
                                    <b>Description</b>: { this.state.workshop.description }
                                </Typography>

                                <Typography variant="body1" className={classes.detailsRow}>
                                    <b>Created By</b>: {this.state.createdBy}
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
                                                onClick={ () => this.openAttachment(this.state.workshop.attachment) }
                                            />
                                        </Card>
                                    </Tooltip>
                                }

                                <b>Status</b>: &ensp;
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
                                    <>
                                        <Chip
                                            icon={<CancelIcon />}
                                            label="Not Approved"
                                            clickable={false}
                                            color="secondary"
                                            variant="outlined"
                                        />
                                        <Grid item xs={12} md={12}>
                                            <div style={{ 
                                                marginBottom: 20, 
                                                marginTop: 20, 
                                                padding:10, 
                                                position: 'relative', 
                                                float: 'right' }}>
                                                
                                                <Link to={"/workshops/edit/"+this.state.id}>
                                                    <button
                                                        type="button" 
                                                        className="btn btn-outline-primary"
                                                    >
                                                        Edit Workshop
                                                    </button>
                                                </Link>
                                            </div>
                                        </Grid>
                                    </>
                                }

                            <Grid item xs={12} md={12} className="py-3">
                                <Alert severity='info'>
                                    Date and Time is Available After the Approval.
                                </Alert>
                            </Grid>

                            </CardContent>                            
                        </Card>
                    </Grid>
                  
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

export default withStyles(styles)(ViewWorkshop);


