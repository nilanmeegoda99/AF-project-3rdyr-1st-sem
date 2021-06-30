import React, { Component } from 'react'
import {
    Grid, Typography, Card, CardContent, Button,Snackbar,
}
from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
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
    }

});

const initialState = {

    loading: false,
    conference: {},
    message: '',
    variant: '',
    id:'',
    events: [],
    snackbar: false,

};
class ConferenceDetails extends Component {

    constructor(props){
        super(props);
        this.state = initialState;
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
        var eventsArr = [];
        var cID = null;
        var snackbarRes = true;

        //get data from db
        await axios.get('http://localhost:5000/api/conferences/active')
        .then(res => {
            console.log(res);
            if(res.data.conference != null){
                if(res.data.success){
                    snackbarRes = false;
                    conferenceOne = res.data.conference;
                    cID = conferenceOne._id;
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

        if(cID != null){
            //get events from db
            await axios.get('http://localhost:5000/api/events/conference/'+cID)
            .then(res => {
                console.log(res);
                if(res.data.events != null){
                    if(res.data.success){
                        snackbarRes = false;
                        eventsArr = res.data.events;
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
        }

        this.setState({
            message: messageRes,
            conference: conferenceOne,
            variant: variantRes,
            snackbar: snackbarRes,
            id: cID,
            events: eventsArr,
        })

        // console.log(this.state);

    }

    render() {

        const { classes } = this.props;

        return (
            <div>
                <Grid container alignItems="center" justify="center" direction="column">

                    { this.state.conference ? 
                    <Grid item xs={12} md={12}>
                        <Card className={classes.detailsCard}>
                            <CardContent>
                                <Typography variant="h4" >ACTIVE CONFERENCE :
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

                                <div>
                                    <hr />
                                    <Typography variant="body1" className={classes.detailsRow}>
                                        <b>Events</b>
                                    </Typography>

                                    { 
                                        this.state.events.length > 0 ?

                                        this.state.events.map(item => (
                                            
                                            <Card className="my-2" key={item._id}>
                                                <CardContent>
                                                    <b>Title: {item.title}</b>
                                                    <br />
                                                    Description: {item.description}
                                                    <br />
                                                    Start Date: {item.startDate}
                                                    <br />
                                                    End Date: {item.startDate}
                                                    <br />
                                                    <button 
                                                        className="btn btn-outline-success btn-sm my-3 float-end" 
                                                        onClick={() => window.location.href = "/admin/events/"+item._id}
                                                    >
                                                        View
                                                    </button>
                                                </CardContent>
                                            </Card>
                                        ))

                                        :
                                        <Alert severity="info">
                                            <b>No Events Found</b>
                                        </Alert>
                                    }


                                </div>
                            </CardContent>                            
                        </Card>
                    </Grid>
                    :
                    <Grid item xs={12} md={12}>
                        <Alert severity="Error">No Active conferences. Please Active a conference.</Alert>
                    </Grid>
                    }
                    
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

export default withStyles(styles)(ConferenceDetails);
