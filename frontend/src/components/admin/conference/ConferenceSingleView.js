import React, { Component } from 'react'
import {
    Grid, Typography, Card, CardContent, Button,
}
from '@material-ui/core';
import { Link } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";

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

class ConferenceSingleView extends Component {

    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    componentDidMount(){

    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Grid container alignItems="center" justify="center" direction="column">

                    <Grid item xs={12} md={12}>
                        <Card className={classes.detailsCard}>
                            <CardContent>
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
                                    Ipsum passage, and going through the cites of the word in classical literature, 
                                    discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 
                                    and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) 
                                    by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, 
                                    very popular during the Renaissance. The first line of Lorem Ipsum, 
                                    "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                                </Typography>

                                <Typography variant="body1" className={classes.detailsRow}>
                                    <b>Venue</b>: Contrary to popular belief, Lorem Ipsum is not simply random text. 
                                    It has roots in a piece of classical Latin literature from 45 BC, making it over 
                                    2000 years old.
                                </Typography>

                                <div>
                                    <hr />
                                    <Typography variant="body1" className={classes.detailsRow}>
                                        <b>Events</b>
                                    </Typography>

                                    <Card className="my-2">
                                        <CardContent>
                                            <b>Event Title</b>
                                            <br />
                                            Contrary to popular belief, Lorem Ipsum is not simply random text. 
                                            It has roots in a piece of classical Latin literature from 45 BC, making it over 
                                            2000 years old.
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardContent>
                                            <b>Event Title</b>
                                            <br />
                                            Contrary to popular belief, Lorem Ipsum is not simply random text. 
                                            It has roots in a piece of classical Latin literature from 45 BC, making it over 
                                            2000 years old.
                                        </CardContent>
                                    </Card>

                                </div>

                                <Link to="/admin/conferences/edit/1">
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

                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(ConferenceSingleView);