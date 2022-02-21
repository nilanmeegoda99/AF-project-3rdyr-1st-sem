import React, { Component } from 'react'
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { Button, Grid, Typography } from '@material-ui/core'
import { withStyles } from "@material-ui/core/styles";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { Alert } from '@material-ui/lab';
import axios from 'axios';
import Loader from '../../common/Loader';
import create_conference from 'url:../../../../public/images/create_conference.jpg';

const styles = theme =>({

    inputElement:{
        paddingLeft: 15,
        paddingRight: 15,
        // minWidth: '360px',
    },

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
    },
};
class CreateConference extends Component {

    constructor(props){
        super(props);
        this.state = initialState;
        this.fromSubmit = this.fromSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDialogBoxButton = this.handleDialogBoxButton.bind(this);

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

        axios.post('http://localhost:5000/api/conferences', this.state.formData)
        .then(res => {
            // console.log(res);
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
            dialogBox = dialogBoxRes;
        })

        setTimeout(() => {
            this.setState({
                message: messageRes,
                variant: variantRes,
                loading: false,
                // dialogBox: dialogBoxRes,
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

    componentDidMount(){

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
                            <img src={create_conference} alt="" width="100%" height="550"/>
                        </Grid>
                    }

                    <Grid item xs={12} md={6}>
                        
                        <Grid container alignItems="center" justify="center" direction="column">
                            
                            <Typography variant="h4" className="pt-5 pb-3">
                                Create Conference
                            </Typography>

                            {/* Loading */}
                            {
                                this.state.loading != false && <Loader />
                            }

                            <ValidatorForm onSubmit={this.fromSubmit}>

                                <Grid container>

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
                                            rows={4}
                                            value={this.state.formData.description}
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
                                        <TextValidator
                                            className="mt-4"
                                            placeholder="Venue"
                                            helperText="Enter Venue"
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            type="text"
                                            name="venue"
                                            value={this.state.formData.venue}
                                            onChange={(e) => this.handleChange(e)} 
                                            validators={['required']}
                                            errorMessages={['This field is required']}
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

export default withStyles(styles)(CreateConference);

