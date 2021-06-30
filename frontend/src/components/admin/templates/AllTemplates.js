import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Typography, Paper, Tooltip,
    Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Snackbar,
} from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import Loader from '../../common/Loader';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import AuthService from '../../../services/AuthService';
import axios from 'axios';
import { Alert } from '@material-ui/lab';

const styles = theme =>({

    root:{
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
    },
    table: {
        maxWidth: 1000,
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

    templates: [],
    
};

class AllTemplates extends Component {

    constructor(props){
        super(props);
        this.state = initialState;
        this.deleteTemplate = this.deleteTemplate.bind(this);
    }

    deleteTemplate(id){
        var result = confirm("Are Sure You Want to delete?");

        if(result){
            var messageRes = '';
            var variantRes = '';
            var snackbarRes = true;
    
            axios.delete('http://localhost:5000/api/materials/'+id)
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

        var messageRes = '';
        var variantRes = '';
        var snackbarRes = true;
        var templatesArr = [];

        //get data from db
        await axios.get('http://localhost:5000/api/materials')
        .then(res => {
            console.log(res);
            
            if(res.status == 200){
                if(res.data.success){
                    snackbarRes = false;
                    templatesArr = res.data.materials;
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
            adminRole: role,
            message: messageRes,
            templates: templatesArr,
            variant: variantRes,
            snackbar: snackbarRes,
        })

    }

    render() {

        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container alignItems="center" justify="center" direction="column">

                    <Grid item xs={12} md={12}>
                        <Typography variant="h4" className="py-3 text-center">
                            All Templates
                        </Typography>
                    </Grid>

                    { this.state.adminRole === 'Reviewer' && 
                        <Grid item xs={12} md={12}>
                            <div style={{ marginBottom: 20, padding:10, position: 'relative', float: 'right' }}>
                                
                                <Link to="/admin/templates/create">
                                    <button
                                        type="button" 
                                        className="btn btn-outline-primary"
                                    >
                                        Add New Template
                                    </button>
                                </Link>
                            </div>
                        </Grid>
                    }

                    <Grid item xs={12} md={12}>

                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="customized table" size="medium" >
                                <TableHead>
                                    <TableRow className={classes.tableHeaderRow}>
                                        <TableCell className={classes.tableHeader} align="center">Conference</TableCell>
                                        <TableCell className={classes.tableHeader} align="center">Type</TableCell>
                                        <TableCell className={classes.tableHeader} align="center">Description</TableCell>
                                        <TableCell className={classes.tableHeader} align="center">Actions</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                {this.state.templates.map((row) => (
                                    <TableRow key={row._id} hover>
                                        <TableCell className={classes.tableCell} >{row.conference.title}</TableCell>
                                        <TableCell className={classes.tableCell} >{row.type}</TableCell>
                                        <TableCell className={classes.tableCell} >{row.description}</TableCell>
                                        <TableCell className={classes.tableCell} >
                                            <Tooltip title="Edit" arrow>
                                                <Link to={"/admin/templates/"+row._id}>
                                                    <EditIcon className={classes.editButtonIcon}></EditIcon>
                                                </Link>
                                            </Tooltip>
                                            {/* <Tooltip title="Active" arrow>
                                                <CheckIcon className={classes.activeButtonIcon}></CheckIcon>
                                            </Tooltip>
                                            <Tooltip title="Inactive" arrow>
                                                <CloseIcon className={classes.deActiveButtonIcon}></CloseIcon>
                                            </Tooltip> */}
                                            <Tooltip title="Delete" arrow>
                                                <DeleteIcon className={classes.deleteButtonIcon}
                                                    onClick={() => this.deleteTemplate(row._id)}    
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
export default withStyles(styles)(AllTemplates);
