import React, { Component } from 'react'
import { Autocomplete } from '@material-ui/lab';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { Button, Grid, Typography, Snackbar } from '@material-ui/core'
import { withStyles } from "@material-ui/core/styles";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { Alert } from '@material-ui/lab';
import Loader from '../../common/Loader';
import attendeeImage from 'url:../../../../public/images/attendeeImage.jpg';
import AuthService from '../../../services/AuthService';
import axios from 'axios';

const styles = theme =>({

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
    
    allDetails: {},

    formData: {
        details: '',
        type: '',
        amount: 0,
        user:'',
    },
    id: '',
    
};
class CreatePayment extends Component {

    constructor(props){
        super(props);
        this.state = initialState;
        this.fromSubmit = this.fromSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDialogBoxButton = this.handleDialogBoxButton.bind(this); 
        this.setSelectedValue = this.setSelectedValue.bind(this);
        this.updateOtherDetails = this.updateOtherDetails.bind(this);
    }

    updateOtherDetails(payid){

        if(this.state.formData.type === "Booking"){

            var messageRes = null;
            var variantRes = null;
            var dialogBoxRes = true;

            var data = {
                payment: payid,
            };
    
            axios.put('http://localhost:5000/api/bookings/paid/'+this.state.id , data)
            .then(res => {
                console.log(res);
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
                    dialogBox: dialogBoxRes,
                    message: messageRes,
                    variant: variantRes,
                    loading: false,
                })
           },2000)

        }
        else{
            
            var messageRes = null;
            var variantRes = null;
            var dialogBoxRes = true;

            var data = {
                payment: payid,
            };
    
            axios.put('http://localhost:5000/api/researches/paid/'+this.state.id , data)
            .then(res => {
                console.log(res);
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
                    dialogBox: dialogBoxRes,
                    message: messageRes,
                    variant: variantRes,
                    loading: false,
                })
           },2000)

        }

    }

    fromSubmit(e){
        e.preventDefault();

        this.setState({
            loading: true,
        })

        // console.log(this.state.formData);
        var messageRes = null;
        var variantRes = null;
        var dialogBoxRes = true;

        axios.post('http://localhost:5000/api/payments', this.state.formData)
        .then(res => {
            console.log(res);
            if(res.status == 201){
                if(res.data.success){
                    messageRes = res.data.message;
                    variantRes = "success";
                    var dialogBoxRes = false;

                    var data = res.data.paymentDetails;
                    var id = data._id;

                    this.updateOtherDetails(id);
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
                dialogBox: dialogBoxRes,
                message: messageRes,
                variant: variantRes,
                loading: false,
            })
       },2000)

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

        window.location.href = "/attendee/my";
    }

    setSelectedValue = (name, value) => {

        var data = this.state.formData;
        data[name] = value;

        this.setState({
            formData: data,
        })

        console.log(this.state);

    }

    loadData(){

        var details = this.props.paymentDetails;
        var d_type = '';
        var amount = 0;
        var typeRefName = null;
        var data = this.state.formData;
        console.log(details)

        if(details.token != null){
            d_type = "Booking";
            amount = 1000;
            typeRefName = 'booking';
        }
        else{
            d_type = "Research";
            amount = 3000;
            typeRefName = 'research';
        }
        
        data['type'] = d_type;
        data['amount'] = amount;
        data['user'] = details.user._id;

        data[typeRefName] = details._id;

        this.setState({
            formData: data,
            allDetails: details,
            id: details._id,
        })

    }

    componentDidMount(){

        this.loadData();

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
                <Grid container alignItems="center" justify="center" direction="column">

                    <Grid item xs={12} md={12}>
                        
                        <Typography variant="h4" className="pt-5 text-center">
                            Make Payment
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
                                        className="mt-4"
                                        placeholder="Description"
                                        helperText="Enter Details About Payment"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        type="text"
                                        name="details"
                                        value={this.state.formData.details}
                                        onChange={(e) => this.handleChange(e)} 
                                        validators={['required']}
                                        errorMessages={['This field is required']}
                                    />
                                </Grid>

                                <Grid item xs={12} md={12} className={classes.inputElement}>
                                    <TextValidator
                                        className="mt-4"
                                        placeholder="Amount"
                                        helperText="Pay Amount"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        type="number"
                                        name="amount"
                                        disabled
                                        value={this.state.formData.amount}
                                        onChange={(e) => this.handleChange(e)} 
                                        validators={['required', 'minNumber:0']}
                                        errorMessages={['This field is required', 'Please Enter Valid Amount']}
                                    />
                                </Grid>

                                <Grid item xs={12} md={12} className={classes.inputElement}>
                                    <TextValidator
                                        className="mt-4"
                                        placeholder="Payment Type"
                                        helperText="Pay Type"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        type="text"
                                        name="type"
                                        disabled
                                        value={this.state.formData.type}
                                        onChange={(e) => this.handleChange(e)} 
                                        validators={['required']}
                                        errorMessages={['This field is required']}
                                    />
                                </Grid>

                                <Grid item xs={12} md={12}>
                                    <div className="text-center my-3">
                                        <Button variant="contained" color="primary" type="submit">
                                            Confirm Payment
                                        </Button>
                                    </div>
                                </Grid>

                            </Grid>

                        </ValidatorForm>
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

                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(CreatePayment);
