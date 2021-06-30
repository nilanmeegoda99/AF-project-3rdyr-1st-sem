import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Typography, Paper, Tooltip,
    Table, TableBody, TableCell, TableHead, TableRow, TableContainer
} from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import Loader from '../../common/Loader';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';

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

    users: [],
    
};

class AllUsers extends Component {

    constructor(props){
        super(props);
        this.state = initialState;
    }

    async componentDidMount(){

        await axios.get('http://localhost:5000/api/users')
        .then(res =>{
            console.log(res);
            this.setState({
                users: res.data,
            })

        })
        .catch(error => {
            console.log("error", error)
        })

    }

    render() {

        const { classes } = this.props;

        return (
            <div>
                <Grid container alignItems="center" justify="center" direction="column">

                    <Grid item xs={12} md={12}>
                        <Typography variant="h4" className="py-3">
                            All Users
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={12}>

                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="customized table" size="medium" >
                                <TableHead>
                                    <TableRow className={classes.tableHeaderRow}>
                                        <TableCell className={classes.tableHeader} align="center">Name</TableCell>
                                        <TableCell className={classes.tableHeader} align="center">Email</TableCell>
                                        <TableCell className={classes.tableHeader} align="center">Contact Number</TableCell>
                                        <TableCell className={classes.tableHeader} align="center">Type</TableCell>
                                        <TableCell className={classes.tableHeader} align="center">Role</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                {this.state.users.map((row) => (
                                    <TableRow key={row.title} hover key={row._id}>
                                        <TableCell className={classes.tableCell} >{row.name}</TableCell>
                                        <TableCell className={classes.tableCell} >{row.email}</TableCell>
                                        <TableCell className={classes.tableCell} >{row.contact_no}</TableCell>
                                        <TableCell className={classes.tableCell} >{row.user_type}</TableCell>
                                        <TableCell className={classes.tableCell} >{row.isAdmin ? "Yes": "No"}
                                        </TableCell>
                                        
                                        {/* <TableCell className={classes.tableCell} >
                                            <Tooltip title="Edit" arrow>
                                                <Link to="/admin/conferences/1">
                                                    <EditIcon className={classes.editButtonIcon}></EditIcon>
                                                </Link>
                                            </Tooltip>
                                            <Tooltip title="Active" arrow>
                                                <CheckIcon className={classes.activeButtonIcon}></CheckIcon>
                                            </Tooltip>
                                            <Tooltip title="Not Active" arrow>
                                                <CloseIcon className={classes.deActiveButtonIcon}></CloseIcon>
                                            </Tooltip>
                                            <Tooltip title="Delete" arrow>
                                                <DeleteIcon className={classes.deleteButtonIcon}></DeleteIcon>
                                            </Tooltip>
                                        </TableCell> */}

                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </Grid>

                </Grid>
            </div>
        )
    }
}

// export default AllConferences;
export default withStyles(styles)(AllUsers);
