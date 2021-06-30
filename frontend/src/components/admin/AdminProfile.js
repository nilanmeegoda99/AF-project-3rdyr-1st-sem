import React, { Component } from 'react';
import { 
    Grid, Typography, Card, CardContent, CardMedia
 } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import userprofile from 'url:../../../public/images/userprofile.png';
import background1 from 'url:../../../public/images/background1.jpg';
import AuthService from '../../services/AuthService';

const styles = theme => ({

root:{
    backgroundImage:"url("+background1+")",
    // height: '92vh',
    height: '86vh',
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

})

const initialState ={
    user: {},
}

class AdminProfile extends Component {

    constructor(props){
        super(props);
        this.state = initialState;
    }

    componentDidMount(){

        const user = AuthService.getUserData();
        const userData = user.userData;

        this.setState({
            user:userData,
        })

    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container alignItems="center" direction="column" justify="center">

                    <Grid item xs={12} md={12}>

                        <Card className={classes.mainCard}>
                            <CardContent>

                                <Grid item xs={12} sm={12}>
                                    <Typography variant="h4" className="mb-3 text-center">
                                        <b>Admin Profile</b>
                                    </Typography>
                                </Grid>

                                <Grid container>
                                    <Grid item xs={12} sm className={classes.cardItem}>
                                        <img src={userprofile} width="250px" height="250px" alt="profile image"></img>
                                    </Grid>

                                    <Grid item xs={12} sm className={classes.cardItem}>
                                        <Typography variant="h6" >
                                            <b>Name:</b> { this.state.user.name }
                                        </Typography>
                                        <Typography variant="h6" >
                                            <b>Email:</b> { this.state.user.email }
                                        </Typography>
                                        <Typography variant="h6" >
                                            <b>Contact.No:</b> { this.state.user.contact_no }
                                        </Typography>
                                        <Typography variant="h6" >
                                            <b>Type:</b> { this.state.user.isAdmin ? "Yes": "No" }
                                        </Typography>
                                        <Typography variant="h6" >
                                            <b>Role:</b> { this.state.user.user_type }
                                        </Typography>
                                            
                                    </Grid>
                                </Grid>

                            </CardContent>
                        </Card>
                    </Grid>

                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(AdminProfile);
