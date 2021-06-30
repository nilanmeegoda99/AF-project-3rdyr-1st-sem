import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Typography, Paper, Tooltip, Snackbar,
    Table, TableBody, TableCell, TableHead, TableRow, TableContainer
} from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import Loader from '../../common/Loader';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import AuthService from '../../../services/AuthService';
import { Alert } from '@material-ui/lab';
import axios from 'axios';

const styles = theme =>({

    root:{
        marginBottom: 20,
    },
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
            color:"red",
        },
    },
    activeButtonIcon: {
        color:"#0B9D16",
    },
    deActiveButtonIcon: {
        color:"#C91200",
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

    adminRole: '',
    
    snackbar: false,
    variant: '',
    message: '',

    bookings: []
    
};

class BookedConferences extends Component {

    constructor(props){
        super(props);
        this.state = initialState;
        this.closeSnackBar = this.closeSnackBar.bind(this);
        this.deleteBooking = this.deleteBooking.bind(this);
    }

    closeSnackBar = (event, response) => {
        this.setState({
            snackbar: false,
        })
    }

    deleteBooking(id){
        var result = confirm("Are Sure You Want to delete?");

        if(result){
            var messageRes = '';
            var variantRes = '';
            var snackbarRes = true;
    
            axios.delete('http://localhost:5000/api/bookings/'+id)
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

    async componentDidMount(){

        var localStorageData = AuthService.getUserData();
        // console.log("User Data",localStorageData);

        var role = localStorageData.userData.user_type;
        var id = localStorageData.userData.id;

        var messageRes = '';
        var variantRes = '';
        var snackbarRes = true;
        var bookingArr = [];

        //get data from db
        await axios.get('http://localhost:5000/api/bookings/user/'+id)
        .then(res => {
            console.log(res);
            
            if(res.status == 200){
                if(res.data.success){
                    snackbarRes = false;
                    bookingArr = res.data.bookings;
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
            bookings: bookingArr,
            variant: variantRes,
            snackbar: snackbarRes,
            adminRole: role,
        })

    }

    render() {

        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container alignItems="center" justify="center" direction="column">

                    <Grid item xs={12} md={12}>
                        <Typography variant="h4" className="py-3 text-center">
                            Booked Conferences
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <div style={{ marginBottom: 20, padding:10, position: 'relative', float: 'right' }}>
                            
                            <Link to="/attendee/booking/create">
                                <button
                                    type="button" 
                                    className="btn btn-outline-primary"
                                >
                                    Book Conference
                                </button>
                            </Link>
                        </div>
                    </Grid>

                    <Grid item xs={12} md={12}>

                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="customized table" size="medium" >
                                <TableHead>
                                    <TableRow className={classes.tableHeaderRow}>
                                        <TableCell className={classes.tableHeader} align="center">Conference</TableCell>
                                        <TableCell className={classes.tableHeader} align="center">Date</TableCell>
                                        <TableCell className={classes.tableHeader} align="center">Payment</TableCell>
                                        <TableCell className={classes.tableHeader} align="center">Status</TableCell>
                                        <TableCell className={classes.tableHeader} align="center">Actions</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                {this.state.bookings.map((row) => (
                                    <TableRow key={row._id} hover>
                                        <TableCell className={classes.tableCell} >{row.conference.title}</TableCell>
                                        <TableCell className={classes.tableCell} >{row.date}</TableCell>
                                        <TableCell className={classes.tableCell} >{row.isPaid ? "Yes":"No"}</TableCell>
                                        <TableCell className={classes.tableCell} >{row.status}</TableCell>
                                        <TableCell className={classes.tableCell} >
                                            <Tooltip title="View" arrow>
                                                <Link to={"/attendee/booking/"+row._id}>
                                                    <EditIcon className={classes.editButtonIcon}></EditIcon>
                                                </Link>
                                            </Tooltip>
                                            <Tooltip title="Delete" arrow>
                                                <DeleteIcon className={classes.deleteButtonIcon}
                                                    onClick={() => this.deleteBooking(row._id)}
                                                ></DeleteIcon>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

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

// export default AllConferences;
export default withStyles(styles)(BookedConferences);
