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

    rows: [
        {
            title: "aghkhjbc gk hjkhj",
            year: "2021/08/05",
            venue: "ghkjk ghkhgk ghkk",
            role: "ghkjk ghkhgk ghkk",
        },
        {
            title: "uiouio oiuu oipop",
            year: "2020/07/07",
            venue: "rtyrty rtyty  tyrtyrt",
            role: "rtyrty rtyty  tyrtyrt",
        },
        {
            title: "abc acs asdsa",
            year: "2019/06/15",
            venue: "asdsa asdsad  sads",
            role: "asdsa asdsad  sads",
        },
    ]
    
};

class AllUsers extends Component {

    constructor(props){
        super(props);
        this.state = initialState;
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
                                        <TableCell className={classes.tableHeader} align="center">Status</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                {this.state.rows.map((row) => (
                                    <TableRow key={row.title} hover>
                                        <TableCell className={classes.tableCell} >{row.title}</TableCell>
                                        <TableCell className={classes.tableCell} >{row.year}</TableCell>
                                        <TableCell className={classes.tableCell} >{row.year}</TableCell>
                                        <TableCell className={classes.tableCell} >{row.venue}</TableCell>
                                        <TableCell className={classes.tableCell} >{row.role}</TableCell>
                                        <TableCell className={classes.tableCell} >Active/Not</TableCell>
                                        
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
