import React, { Component } from 'react'
import { Autocomplete } from '@material-ui/lab';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { Button, Grid, Typography, Snackbar } from '@material-ui/core'
import { withStyles } from "@material-ui/core/styles";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { Alert } from '@material-ui/lab';
import axios from 'axios';
import Loader from '../../common/Loader';

const styles = theme =>({
    
    root:{
        paddingLeft: 250,
        paddingRight: 250,
    },
    inputElement:{
        paddingLeft: 15,
        paddingRight: 15,
        // minWidth: '360px',
    },
    formGrid: {
        paddingLeft: 30,
        paddingRight: 30,
    },

});

const initialState = {

    isLargeScreen: true,
    variant: '',
    message: '',
    loading: false,
    dialogBox: false,
    snackbar: false,
    message: '',
    variant:'',
    id: '',

    formData: {
        title: '',
        description: '',
        venue: '',
        startDate: '',
        endDate: '',
        otherDetails: '',
    },
    
};

class EditEvent extends Component {

    constructor(props){
        super(props);
        this.state = initialState;
        this.fromSubmit = this.fromSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDialogBoxButton = this.handleDialogBoxButton.bind(this); 
        this.setSelectedValue = this.setSelectedValue.bind(this); 
        this.loadData = this.loadData.bind(this); 

    }

    fromSubmit(e){
        e.preventDefault();

        this.setState({
            loading: true,
        })

        console.log(this.state);
        var messageRes = null;
        var variantRes = null;
        var dialogBoxRes = true;

        axios.put('http://localhost:5000/api/events/'+this.state.id, this.state.formData)
        .then(res => {
            if(res.status == 200){
                if(res.data.success){
                    messageRes = res.data.message;
                    variantRes = "success";
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
            console.log(error);
            messageRes = error.message;
            variantRes = "error";
        })

        setTimeout(() => {
            this.setState({
                message: messageRes,
                variant: variantRes,
                loading: false,
                dialogBox: dialogBoxRes,
            })
        }, 2000);

    }

    handleChange = (e) => {
        var name = e.target.name;
        var value = e.target.value;
        var data = this.state.formData;

        data[name] = value

        this.setState({
            formData: data,
        })
    }

    handleDialogBoxButton(){
        this.setState({
            dialogBox: false,
        })

        window.location.href = "/admin/events";
    }

    setSelectedValue = (name, value) => {

        var data = this.state.formData;
        data[name] = value;

        this.setState({
            formData: data,
        })

        console.log(this.state);

    }

    async loadData(eId){

        var eventsOne = {};
        var messageRes = '';
        var variantRes = '';
        var snackbarRes = true;

        //get data from db
        await axios.get('http://localhost:5000/api/events/'+eId)
        .then(res => {
            console.log(res);
            if(res.status == 200){
                if(res.data.success){
                    variantRes = "success";
                    eventsOne = res.data.event;
                    snackbarRes = false;
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
            formData: eventsOne,
            variant: variantRes,
            snackbar: snackbarRes,
            id: eId,
        });

    }

    componentDidMount(){

        var eId = this.props.match.params.id;

        //load data
        this.loadData(eId);

        if(window.innerWidth < 960){
            this.setState({
                isLargeScreen: false,
            });
        }

        window.addEventListener('resize', () => {
            if(window.innerWidth < 960){
                this.setState({
                    isLargeScreen: false,
                });
            }
            else{
                this.setState({
                    isLargeScreen: true,
                });
            }
        })

    }

    render() {

        const { classes } = this.props;

        return (
            <div>
                <Grid container className={ this.state.isLargeScreen ? classes.root : "px-1"}>

                    <Grid item xs={12} md={12}>
                        
                        <Grid container alignItems="center" justify="center" direction="column">
                            
                            <Typography variant="h4" className="pt-5">
                                Edit Event
                            </Typography>

                            {/* Loading */}
                            { this.state.loading != false && 
                                <div className="mt-4">
                                    <Loader/>
                                </div>
                            }
                            <ValidatorForm onSubmit={this.fromSubmit}>

                                <Grid container className={classes.formGrid}>

                                    <Grid item xs={12} md={12} className={classes.inputElement}>
                                        <TextValidator
                                            className="mt-5"
                                            placeholder="Title"
                                            helperText="Enter Title"
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            type="text"
                                            name="title"
                                            value={this.state.formData.title}
                                            onChange={(e) => this.handleChange(e)} 
                                            validators={['required']}
                                            errorMessages={['This field is required']}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={12} className={classes.inputElement}>
                                        <TextValidator
                                            className="mt-4"
                                            placeholder="Description"
                                            helperText="Enter Description"
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            type="text"
                                            name="description"
                                            multiline={true}
                                            rows={3}
                                            value={this.state.formData.description}
                                            onChange={(e) => this.handleChange(e)} 
                                            validators={['required']}
                                            errorMessages={['This field is required']}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={12} className={classes.inputElement}>
                                        <TextValidator
                                            className="mt-4"
                                            placeholder="Other Details"
                                            helperText="Enter Other Details"
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            type="text"
                                            name="otherDetails"
                                            multiline={true}
                                            rows={3}
                                            value={this.state.formData.otherDetails}
                                            onChange={(e) => this.handleChange(e)} 
                                            validators={['required']}
                                            errorMessages={['This field is required']}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} className={classes.inputElement}>
                                        <TextValidator
                                            className="mt-4"
                                            placeholder="Start Date"
                                            helperText="Enter Start Date"
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            type="date"
                                            name="startDate"
                                            value={this.state.formData.startDate}
                                            onChange={(e) => this.handleChange(e)} 
                                            validators={["required"]}
                                            errorMessages={["This field is required"]}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} className={classes.inputElement}>
                                        <TextValidator
                                            className="mt-4"
                                            placeholder="End Date"
                                            helperText="Enter End Date"
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            type="date"
                                            name="endDate"
                                            value={this.state.formData.endDate}
                                            onChange={(e) => this.handleChange(e)} 
                                            validators={["required"]}
                                            errorMessages={["This field is required"]}
                                        />
                                    </Grid>
                                                                    
                                    <Grid item xs={12} md={12}>
                                        <div className="text-center my-3">
                                            <Button variant="contained" color="primary" type="submit">
                                                Update
                                            </Button>
                                        </div>
                                    </Grid>

                                    <Grid item xs={12} md={12}>
                                        <Alert severity="info">
                                            <Typography variant="body2">
                                                Can't Update the conference after the event is created.
                                            </Typography>
                                        </Alert>
                                    </Grid>

                                </Grid>

                                {/* Dialog box */}
                                <Dialog open={this.state.dialogBox}>

                                    <DialogContent>
                                        <Alert severity={this.state.variant}>
                                            <Typography variant="h5">
                                                {this.state.message}
                                            </Typography>
                                        </Alert>
                                        <div className="text-center my-2">
                                            <Button 
                                                variant="contained" 
                                                color="secondary" 
                                                onClick={this.handleDialogBoxButton}>
                                                OK
                                            </Button>
                                        </div>
                                    </DialogContent>
                                    
                                </Dialog>

                            </ValidatorForm>


                        </Grid>

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

export default withStyles(styles)(EditEvent);
