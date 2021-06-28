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
import AuthService from '../../../services/AuthService';

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

    rows: [
        {
            title: "aghkhjbc gk hjkhj",
            year: "2021/08/05",
            year: "2021/08/05",
            venue: "ghkjk ghkhgk ghkk",
        },
        {
            title: "uiouio oiuu oipop",
            year: "2020/07/07",
            year: "2020/07/07",
            venue: "rtyrty rtyty tyrtyrt",
        },

    ]
    
};

class AdminWorkshops extends Component {

    constructor(props){
        super(props);
        this.state = initialState;
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
            <div className={classes.root}>
                <Grid container alignItems="center" justify="center" direction="column">

                    <Grid item xs={12} md={12}>
                        <Typography variant="h4" className="py-3 text-center">
                            All Workshops
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={12}>

                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="customized table" size="medium" >
                                <TableHead>
                                    <TableRow className={classes.tableHeaderRow}>
                                        <TableCell className={classes.tableHeader} align="center">Title</TableCell>
                                        <TableCell className={classes.tableHeader} align="center">Date</TableCell>
                                        <TableCell className={classes.tableHeader} align="center">Time</TableCell>
                                        <TableCell className={classes.tableHeader} align="center">No of Materials</TableCell>
                                        <TableCell className={classes.tableHeader} align="center">Conference</TableCell>
                                        <TableCell className={classes.tableHeader} align="center">Actions</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                {this.state.rows.map((row) => (
                                    <TableRow key={row.title} hover>
                                        <TableCell className={classes.tableCell} >{row.title}</TableCell>
                                        <TableCell className={classes.tableCell} >{row.year}</TableCell>
                                        <TableCell className={classes.tableCell} >{row.venue}</TableCell>
                                        <TableCell className={classes.tableCell} >5</TableCell>
                                        <TableCell className={classes.tableCell} >{row.venue}</TableCell>
                                        <TableCell className={classes.tableCell} >
                                            <Tooltip title="Edit" arrow>
                                                <Link to="/admin/workshops/1">
                                                    <EditIcon className={classes.editButtonIcon}></EditIcon>
                                                </Link>
                                            </Tooltip>
                                            <Tooltip title="Approved" arrow>
                                                <CheckIcon className={classes.activeButtonIcon}></CheckIcon>
                                            </Tooltip>
                                            <Tooltip title="Not Approved" arrow>
                                                <CloseIcon className={classes.deActiveButtonIcon}></CloseIcon>
                                            </Tooltip>
                                            <Tooltip title="Delete" arrow>
                                                <DeleteIcon className={classes.deleteButtonIcon}></DeleteIcon>
                                            </Tooltip>
                                        </TableCell>
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
export default withStyles(styles)(AdminWorkshops);
