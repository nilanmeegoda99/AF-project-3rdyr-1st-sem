import React, { Component } from 'react'
import {
    Grid, Typography, Card, CardContent, Button, Chip, 
    Switch, FormControlLabel, FormGroup,
}
from '@material-ui/core';
import { Link } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import AuthService from '../../../services/AuthService';

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
}

class EventSingleView extends Component {

    constructor(props){
        super(props);
        this.state = initialState;
        this.setApproveStatus = this.setApproveStatus.bind(this);
    }

    setApproveStatus(){

        var approved_status = this.state.approved;

        if(approved_status){
            approved_status = false;
        }
        else{
            approved_status = true;
        }

        this.setState({
            approved:approved_status
        })

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
                                <Typography variant="h4" >EVENT : Title</Typography>
                                <Typography variant="h4" >CONFERENCE : Title</Typography>
                                <hr />
                                <Typography variant="body1" className={classes.detailsRow}>
                                    <b>Start Date</b>: 2020/01/01
                                </Typography>

                                <Typography variant="body1" className={classes.detailsRow}>
                                    <b>End Date</b>: 2020/01/01
                                </Typography>

                                <Typography variant="body1" className={classes.detailsRow}>
                                    <b>Description</b>: Contrary to popular belief, Lorem Ipsum is not simply random text. 
                                    It has roots in a piece of classical Latin literature from 45 BC, making it over 
                                    2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in 
                                    Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem 
                                </Typography>

                                <Typography variant="body1" className={classes.detailsRow}>
                                    <b>Other Details</b>: Sponsor Contrary to popular belief, Lorem Ipsum is not simply random text. 
                                    It has roots in a piece of classical Latin literature from 45 BC, making it over 
                                    2000 years old.
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
                                    
                                    <Link to="/admin/events/edit/1">
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

                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(EventSingleView);