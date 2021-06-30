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

});

const initialState = {

    isLargeScreen: true,
    variant: '',
    message: '',
    loading: false,
    dialogBox: false,
    id: '',

    formData: {
        title: '',
        description: '',
        venue: '',
        startDate: '',
        endDate: '',
    },
};
class EditConferenceDetails extends Component {

    constructor(props){
        super(props);
        this.state = initialState;
        this.fromSubmit = this.fromSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDialogBoxButton = this.handleDialogBoxButton.bind(this);
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

        axios.put('http://localhost:5000/api/conferences/'+this.state.id, this.state.formData)
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

        window.location.href = "/admin/conferences";
    }

    async loadData(cId){
        var conferenceOne;
        var messageRes = '';
        var variantRes = '';

        //get data from db
        await axios.get('http://localhost:5000/api/conferences/'+cId)
        .then(res => {
            console.log(res);
            if(res.status == 200){
                if(res.data.success){
                    messageRes = res.data.message;
                    variantRes = "success";
                    conferenceOne = res.data.conference;
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
            formData: conferenceOne,
            variant: variantRes,
            id: cId,
        })

    }

    componentDidMount(){

        //load data from database
        var cId = this.props.match.params.id;
        this.loadData(cId);

        if(window.innerWidth < 850){
            this.setState({
                isLargeScreen: false,
            });
        }

        window.addEventListener('resize', () => {
            if(window.innerWidth < 850){
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
                <Grid container className={ this.state.isLargeScreen ? classes.root : "py-3"}>

                    <Grid item xs={12} md={12}>
                        
                        <Grid container alignItems="center" justify="center" direction="column">
                            
                            <Typography variant="h4" className="pt-5 pb-3">
                                Edit Conference
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
                                                Update
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

export default withStyles(styles)(EditConferenceDetails);

