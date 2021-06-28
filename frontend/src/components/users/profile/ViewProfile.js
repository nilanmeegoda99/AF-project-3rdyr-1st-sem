import React, { Component } from 'react';
import { 
    Grid, Typography, Card, CardContent, CardMedia, Tooltip
 } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import userprofile from 'url:../../../../public/images/userprofile.png';
import background2 from 'url:../../../../public/images/background2.jpg';
import { Alert } from '@material-ui/lab';
import DeleteIcon from '@material-ui/icons/Delete';
 
const styles = theme => ({
    root:{
        backgroundImage:"url("+background2+")",
        minHeight: '90vh',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    },
    mainCard:{
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    cardItem:{
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
    },
    deleteIcon: {
        color: 'red',
        '&:hover':{
            cursor: 'pointer',
            opacity: '0.5',
        }
    },
    notificationCard:{
        backgroundColor:'#F5F5F5',
        '&:hover':{
            cursor: 'pointer',
            backgroundColor:'#EEF0F2',
        }
    },

})

const initialState = {
    haveNotifications: false,
    notifications: [],
};
class ViewProfile extends Component {

    constructor(props){
        super(props);
        this.state = initialState;
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container alignItems="center" direction="column" justify="center">

                    <Grid item xs={12} md={12} className="px-3">

                        <Card className={classes.mainCard}>
                            <CardContent>

                                <Grid item xs={12} sm={12}>
                                    <Typography variant="h4" className="mb-3 text-center">
                                        <b>User Profile</b>
                                    </Typography>
                                </Grid>

                                <Grid container>
                                    <Grid item xs={12} sm className={classes.cardItem}>
                                        <img src={userprofile} width="250px" height="250px" alt="profile image"></img>
                                    </Grid>

                                    <Grid item xs={12} sm className={classes.cardItem}>
                                        <Typography variant="h6" >
                                            <b>Name:</b> Amal Perera
                                        </Typography>
                                        <Typography variant="h6" >
                                            <b>Email:</b> abc@gmail.com
                                        </Typography>
                                        <Typography variant="h6" >
                                            <b>Contact.No:</b> 0111123123
                                        </Typography>
                                        <Typography variant="h6" >
                                            <b>Type:</b> User
                                        </Typography>
                                        <Typography variant="h6" >
                                            <b>Role:</b> Researcher
                                        </Typography>
                                        <Typography variant="h6" >
                                            <b>Status</b> Active/Not
                                        </Typography>
                                        
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* User Notifications */}

                    <Grid item xs={12} md={12} className="px-3">

                        <Card className={classes.mainCard}>
                            <CardContent>

                                <Grid item xs={12} sm={12}>
                                    <Typography variant="h4" className="mb-3 text-center">
                                        <b>User Notifications</b>
                                    </Typography>
                                </Grid>

                                <Grid container alignItems="center" direction="column" justify="center">

                                    { this.state.haveNotifications == false ? 
                                        
                                        <Card className={classes.notificationCard}>
                                            <CardContent>
                                                <Grid item xs={12} md={12} className={classes.cardItem}>
                                                    <Typography variant="h6" className="mt-1">
                                                        <b>Title:</b> Submission of research paper
                                                    </Typography>
                                                    <Typography variant="h6" className="mt-1">
                                                        <b>Message:</b> took a galley of type and scrambled it to make a t ype specimen book. 
                                                    </Typography>

                                                    <b>Received On:</b> 2020/02/02 10.00AM

                                                    <Tooltip title="Delete Notification" arrow>
                                                        <Typography className="float-end my-2">
                                                            <DeleteIcon className={classes.deleteIcon} 
                                                                onClick={()=> alert('Are you Sure?')}
                                                            />
                                                        </Typography>
                                                    </Tooltip>
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                        :
                                        <Alert severity="info">You Don't Have Any Notifications</Alert>
                                    
                                    }

                                </Grid>

                            </CardContent>
                        </Card>
                    </Grid>

                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(ViewProfile);

