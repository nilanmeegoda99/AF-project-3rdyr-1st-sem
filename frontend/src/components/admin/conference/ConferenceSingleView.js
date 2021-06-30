import React, { Component } from 'react'
import {
    Grid, Typography, Card, CardContent, Button, Chip, 
    Switch, FormControlLabel, FormGroup,Snackbar,
}
from '@material-ui/core';
import { Link } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";
import { Alert } from '@material-ui/lab';
import axios from 'axios';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';

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

    loading: false,
    conference: {},
    message: '',
    variant: '',
    id:'',
    active: false,
    snackbar: false,

};
class ConferenceSingleView extends Component {

    constructor(props){
        super(props);
        this.state = initialState;
        this.setActiveStatus = this.setActiveStatus.bind(this);
    }

    
    async setActiveStatus(){

        var activeStatus = this.state.active;
        var conferenceOne;
        var messageRes = '';
        var variantRes = '';

        if(activeStatus){
            activeStatus = false;
        }
        else{
            activeStatus = true;
        }

        var data = {
            active: activeStatus,
        }

        await axios.put('http://localhost:5000/api/conferences/active/'+this.state.id, data)
        .then(res => {
            console.log(res);
            if(res.status == 200){
                if(res.data.success){
                    variantRes = "success";
                    messageRes = "Conference Active Status Changed";
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
            messageRes = "Error";
        })

        this.setState({
            active:activeStatus,
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

        var conferenceOne;
        var messageRes = '';
        var variantRes = '';

        var cId = this.props.match.params.id;

        //get data from db
        await axios.get('http://localhost:5000/api/conferences/'+cId)
        .then(res => {
            console.log(res);
            if(res.status == 200){
                if(res.data.success){
                    variantRes = "success";
                    conferenceOne = res.data.conference;
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
            conference: conferenceOne,
            variant: variantRes,
            id: cId,
            active: conferenceOne.active,
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
                                <Typography variant="h4" >CONFERENCE : 
                                    {( this.state.conference.title+ "").toUpperCase() }</Typography>
                                <hr />
                                <Typography variant="body1" className={classes.detailsRow}>
                                    <b>Start Date</b>: { this.state.conference.startDate }
                                </Typography>

                                <Typography variant="body1" className={classes.detailsRow}>
                                    <b>End Date</b>: { this.state.conference.endDate }
                                </Typography>

                                <Typography variant="body1" className={classes.detailsRow}>
                                    <b>Description</b>: { this.state.conference.description }
                                </Typography>

                                <Typography variant="body1" className={classes.detailsRow}>
                                    <b>Venue</b>: { this.state.conference.venue }
                                </Typography>

                                {
                                    this.state.active ? 
                                    <Chip
                                        icon={<CheckCircleIcon style={{ color: '#018E17' }} />}
                                        label="Active"
                                        clickable={false}
                                        style={{ color: '#018E17' }}
                                        variant="outlined"
                                    />
                                    :
                                    <Chip
                                        icon={<CancelIcon />}
                                        label="Not Active"
                                        clickable={false}
                                        color="secondary"
                                        variant="outlined"
                                    />
                                }
                                {/* </Typography> */}

                           
                                <Typography variant="body1" className="mt-4">
                                    <b>Change Status</b>
                                </Typography>
                                <FormGroup row>
                                    <FormControlLabel
                                        control={
                                            <Switch 
                                                checked={this.state.active}
                                                onChange={this.setActiveStatus}
                                                color="primary"
                                                label="Primary"
                                            />
                                        }
                                        label={ this.state.active ? "Active" : "Not Active" }
                                    />
                                </FormGroup>

                                <Link to={"/admin/conferences/edit/"+this.state.id}>
                                    <Button 
                                        className="mt-3 float-end"
                                        // onClick={() => window.location.href = "/admin/conferences/edit/1"}
                                        variant="contained"
                                        color="primary"
                                    >
                                        Edit
                                    </Button>
                                </Link>

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

export default withStyles(styles)(ConferenceSingleView);