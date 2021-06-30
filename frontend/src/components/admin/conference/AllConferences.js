import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Typography, Paper, Tooltip,
    Table, TableBody, TableCell, TableHead, TableRow, TableContainer,Snackbar,
} from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import Loader from '../../common/Loader';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import { Alert } from '@material-ui/lab';

const styles = theme =>({

    table: {
        // minWidth: 650,
    },
    editButtonIcon: {
        color:"#0625C8",
        '&:hover':{
            color:"#0CD1BF",
        },
    },
    deleteButtonIcon: {
        color:"#B8BFBE",
        '&:hover':{
            color:"#C91212",
        },
    },
    activeButtonIcon: {
        color:"#0B9D16",
    },
    deActiveButtonIcon: {
        color:"#EDAA26",
    },
    tableHeader: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: '1rem',
    },
    tableHeaderRow:{
        backgroundColor: '#000',
    },
    tableCell:{
        padding: 30,
        fontSize: '1rem',
    }

});

const initialState = {

    isLargeScreen: true,
    loading: false,
    conferences: [],
    message: '',
    variant: '',
    snackbar: false,

};

class AllConferences extends Component {

    constructor(props){
        super(props);
        this.state = initialState;
        this.deleteConference = this.deleteConference.bind(this);
    }

    deleteConference(id){

        var result = confirm("Are Sure You Want to delete?");

        if(result){
            var messageRes = '';
            var variantRes = '';
            var snackbarRes = true;
    
            axios.delete('http://localhost:5000/api/conferences/'+id)
            .then(res => {
                console.log(res);
                if(res.status == 200){
                    if(res.data.success){
                        snackbarRes = false;
                        window.location.reload(false);
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
                console.log("Error:",error);
                variantRes = "error";
                messageRes = error;
            })
            
            this.setState({
                message: messageRes,
                variant: variantRes,
                snackbar: snackbarRes,
            })
        }

    }

    closeSnackBar = (event, response) => {
        this.setState({
            snackbar: false,
        })
    }

    async componentDidMount(){

        var conferencesArr = [];
        var messageRes = '';
        var variantRes = '';
        var snackbarRes = true;

        //get data from db
        await axios.get('http://localhost:5000/api/conferences')
        .then(res => {
            // console.log(res);
            
            if(res.status == 200){
                if(res.data.success){
                    snackbarRes = false;
                    conferencesArr = res.data.conferences;
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
            conferences: conferencesArr,
            variant: variantRes,
            snackbar: snackbarRes,
        })

    }

    render() {

        const { classes } = this.props;

        return (
            <div>
                <Grid container alignItems="center" justify="center" direction="column">

                    <Grid item xs={12} md={12}>
                        <Typography variant="h4" className="py-3">
                            All Conferences
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={12}>

                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="customized table" size="medium" >
                                <TableHead>
                                    <TableRow className={classes.tableHeaderRow}>
                                        <TableCell className={classes.tableHeader} align="center">Title</TableCell>
                                        <TableCell className={classes.tableHeader} align="center">Start Date</TableCell>
                                        <TableCell className={classes.tableHeader} align="center">End Date</TableCell>
                                        <TableCell className={classes.tableHeader} align="center">Venue</TableCell>
                                        <TableCell className={classes.tableHeader} align="center">Actions</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                {this.state.conferences.map((row) => (
                                    <TableRow key={row.title} hover>
                                        <TableCell className={classes.tableCell} >{row.title}</TableCell>
                                        <TableCell className={classes.tableCell} >{row.startDate}</TableCell>
                                        <TableCell className={classes.tableCell} >{row.endDate}</TableCell>
                                        <TableCell className={classes.tableCell} >{row.venue}</TableCell>
                                        <TableCell className={classes.tableCell} >
                                            <Tooltip title="Edit" arrow>
                                                <Link to={"/admin/conferences/"+row._id}>
                                                    <EditIcon className={classes.editButtonIcon}></EditIcon>
                                                </Link>
                                            </Tooltip>
                                            { 
                                                row.active ?
                                                <Tooltip title="Active" arrow>
                                                    <CheckIcon className={classes.activeButtonIcon}></CheckIcon>
                                                </Tooltip>
                                                :
                                                <Tooltip title="Not Active" arrow>
                                                    <CloseIcon className={classes.deActiveButtonIcon}></CloseIcon>
                                                </Tooltip>
                                            }

                                            <Tooltip title="Delete" arrow>
                                                <DeleteIcon 
                                                    className={classes.deleteButtonIcon}
                                                    onClick={() => this.deleteConference(row._id)}
                                                ></DeleteIcon>
                                            </Tooltip>

                                        </TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

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

// export default AllConferences;
export default withStyles(styles)(AllConferences);

