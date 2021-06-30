import React, { Component } from 'react';
import { 
    Grid, Typography, Card, CardContent, CardMedia, Tooltip
 } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import userprofile from 'url:../../../../public/images/userprofile.png';
import background2 from 'url:../../../../public/images/background2.jpg';
import { Alert } from '@material-ui/lab';
import DeleteIcon from '@material-ui/icons/Delete';
import AuthService from '../../../services/AuthService';
import axios from 'axios';

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
    user: {},
    notifications: [],
};
class ViewProfile extends Component {

    constructor(props){
        super(props);
        this.state = initialState;
        this.deleteNotification = this.deleteNotification.bind(this);
    }

    deleteNotification(id){
        axios.delete('http://localhost:5000/api/notifications/'+id)
        .then(res => {
            window.location.reload(false);
        })
        .catch(error => {
            console.log(error)
        })

        this.setState({
            user:userData,
        })
    }
    
    componentDidMount(){

        const user = AuthService.getUserData();
        const userData = user.userData;
        const id = user.userData._id;

        axios.get('http://localhost:5000/api/notifications/user/'+id)
        .then(res => {
            var data = res.data.notifications;

            this.setState({
                notifications: data,
            })
        })
        .catch(error => {
            console.log(error)
        })

        this.setState({
            user:userData,
        })

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
                                            <b>Name:</b> {this.state.user.name}
                                        </Typography>
                                        <Typography variant="h6" >
                                            <b>Email:</b> {this.state.user.email }
                                        </Typography>
                                        <Typography variant="h6" >
                                            <b>Contact.No:</b> {this.state.user.contact_no}
                                        </Typography>
                                        <Typography variant="h6" >
                                            <b>Type:</b> {this.state.user.user_type}
                                        </Typography>
                                        <Typography variant="h6" >
                                            <b>Admin Role:</b> {this.state.user.isAdmin ? "Yes": "No"}
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

                                    { this.state.notifications.length > 0 ?
                                        
                                        this.notifications.map((item) => (
                                            
                                        <Card className={classes.notificationCard}>
                                            <CardContent>
                                                <Grid item xs={12} md={12} className={classes.cardItem}>
                                                    <Typography variant="h6" className="mt-1">
                                                        <b>Title:</b> {item.title}
                                                    </Typography>
                                                    <Typography variant="h6" className="mt-1">
                                                        <b>Message:</b> {item.message} 
                                                    </Typography>

                                                    <b>Received On:</b> {item.date} &ensp; {item.time}

                                                    <Tooltip title="Delete Notification" arrow>
                                                        <Typography className="float-end my-2">
                                                            <DeleteIcon className={classes.deleteIcon} 
                                                                onClick={()=> this.deleteNotification(item._id) }
                                                            />
                                                        </Typography>
                                                    </Tooltip>
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                        
                                        ))

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

