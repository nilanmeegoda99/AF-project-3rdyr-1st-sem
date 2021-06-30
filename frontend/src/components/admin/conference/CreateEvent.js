import React, { Component } from 'react'
import { Autocomplete } from '@material-ui/lab';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { Button, Grid, Typography } from '@material-ui/core'
import { withStyles } from "@material-ui/core/styles";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { Alert } from '@material-ui/lab';
import axios from 'axios';

import Loader from '../../common/Loader';
import createEvent from 'url:../../../../public/images/createEvent.jpg';

const styles = theme =>({

    inputElement:{
        paddingLeft: 15,
        paddingRight: 15,
        // minWidth: '360px',
    },
    formGrid: {
        paddingLeft: 30,
        paddingRight: 30,
    }

});

const initialState = {

    isLargeScreen: true,
    variant: '',
    message: '',
    loading: false,
    dialogBox: false,

    formData: {
        title: '',
        description: '',
        venue: '',
        startDate: '',
        endDate: '',
        otherDetails: '',
        conference: '',
    },
    conferences: [],
    
};
class CreateEvent extends Component {

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

        axios.post('http://localhost:5000/api/events', this.state.formData)
        .then(res => {
            
            if(res.status == 201){
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

        window.location.reload(false);
    }

    setSelectedValue = (name, value) => {

        var data = this.state.formData;
        data[name] = value;

        this.setState({
            formData: data,
        })

        // console.log(this.state);

    }

    async loadData(){

        var conferenceOne;
        var conferenceArr = [];

        //get data from db
        await axios.get('http://localhost:5000/api/conferences/active')
        .then(res => {
            console.log(res);
            if(res.status == 200){
                if(res.data.success){
                    conferenceOne = res.data.conference;
                    conferenceArr.push(conferenceOne);
                }
            }
        })
        .catch(error => {
            console.log("Error:",error)
        })

        this.setState({
            conferences: conferenceArr,
        })

    }

    componentDidMount(){

        //load conferences
        this.loadData()

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
                <Grid container>

                    { this.state.isLargeScreen && 
                        <Grid item xs={12} md={6}>
                            <img src={createEvent} alt="" width="100%" height="650"/>
                        </Grid>
                    }

                    <Grid item xs={12} md={6}>
                        
                        <Grid container alignItems="center" justify="center" direction="column">
                            
                            <Typography variant="h4" className="pt-5">
                                Create Event
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
                                    
                                    <Grid item xs={12} md={12} className={classes.inputElement}>
                                        <Autocomplete
                                            className="mt-4"
                                            fullWidth
                                            options={this.state.conferences}
                                            getOptionLabel={(opt) => opt.title}
                                            name="conference"
                                            size='small'
                                            onChange={(e,v) => this.setSelectedValue("conference", v == null ? null : v._id) }
                                            renderInput={(params) =><TextValidator {...params} variant="outlined"
                                                placeholder="Select Conference"
                                                helperText="Select Conference"
                                                value={this.state.formData.conference == '' ? '' : this.state.formData.conference}
                                                validators={["required"]}
                                                errorMessages={["User Type is required!"]}
                                            /> }
                                        />
                                    </Grid>
                                                                    
                                    <Grid item xs={12} md={12}>
                                        <div className="text-center my-3">
                                            <Button variant="contained" color="primary" type="submit">
                                                Create
                                            </Button>
                                        </div>
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


                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(CreateEvent);

