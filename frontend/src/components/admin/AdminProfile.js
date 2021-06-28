import React, { Component } from 'react';
import { 
    Grid, Typography, Card, CardContent, CardMedia
 } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import userprofile from 'url:../../../public/images/userprofile.png';
import background1 from 'url:../../../public/images/background1.jpg';

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

class AdminProfile extends Component {

    constructor(props){
        super(props);
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
                                            <b>Name:</b> Amal Perera
                                        </Typography>
                                        <Typography variant="h6" >
                                            <b>Email:</b> abc@gmail.com
                                        </Typography>
                                        <Typography variant="h6" >
                                            <b>Contact.No:</b> 0111123123
                                        </Typography>
                                        <Typography variant="h6" >
                                            <b>Type:</b> Admin
                                        </Typography>
                                        <Typography variant="h6" >
                                            <b>Role:</b> Super Admin
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
