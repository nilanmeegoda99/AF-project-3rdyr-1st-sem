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
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import researchImage from 'url:../../../../public/images/researchImage.jpg';
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
    noOfFiles: 0,

    formData: {
        title: '',
        description: '',
        attachment: [],
        conference: '',
        user: '',
    },
    attachments: [],
    conferences: [],
    
};
class CreateResearch extends Component {

    constructor(props){
        super(props);
        this.state = initialState;
        this.fromSubmit = this.fromSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDialogBoxButton = this.handleDialogBoxButton.bind(this); 
        this.setSelectedValue = this.setSelectedValue.bind(this); 
        this.handleFileUpload = this.handleFileUpload.bind(this); 
        this.closeSnackBar = this.closeSnackBar.bind(this); 
        this.loadData = this.loadData.bind(this); 
        this.uploadData = this.uploadData.bind(this); 

    }

    uploadData(){
        console.log(this.state);
        var messageRes = null;
        var variantRes = null;
        var dialogBoxRes = false;
        var snackBarres = true;

        axios.post('http://localhost:5000/api/researches', this.state.formData)
        .then(res => {
            if(res.status == 201){
                messageRes = res.data.message;
                variantRes = "success";
                dialogBoxRes = true;
                snackBarres = false;
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
                snackbar: snackBarres,
                dialogBox: dialogBoxRes,
            })
        }, 2000);

    }

    fromSubmit(e){
        e.preventDefault();

        this.setState({
            loading: true,
        })

        console.log(this.state);
        var messageRes = null;
        var variantRes = null;
        var fileUrl = '';
        var snackbarRes = true;
        var form_data = this.state.formData;

        var data = new FormData();
        data.append("attachment",this.state.attachments[0]);

        axios.post('http://localhost:5000/api/files/uploadFile', data)
        .then(res => {
            if(res.status == 200){
                console.log(res);
                fileUrl = res.data.path.replace(/\\/g, "/");
                // console.log("FIle:",fileUrl);
                
                messageRes = "File Upload Success";
                variantRes = "success";
                snackbarRes = false;
                form_data['attachment'] = fileUrl;

                this.setState({
                    formData: form_data,
                })

                this.uploadData();

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

        setTimeout( () => {
            this.setState({
                message: messageRes,
                variant: variantRes,
                loading: false,
                snackbar: snackbarRes,
            })
        }, 2000)


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

        window.location.href = "/researches/";
    }

    setSelectedValue = (name, value) => {

        var data = this.state.formData;
        data[name] = value;

        this.setState({
            formData: data,
        })

        // console.log(this.state);

    }

    //File choose action
    handleFileUpload = event => {
        event.persist();
        
        var files = [];
        var data = this.state.formData;

        if (event.target.files[0] !== undefined) {

            if(event.target.files.length < 2){
                
                for (let j = 0; j < event.target.files.length; j++) {
                    let file = event.target.files[j];
    
                    if(file.size > 10000000){
                        this.setState({
                            message: "For each file size must be less than 10MB.",
                            variant: "error",
                            snackbar: true,
                        });
                        break;
                    }
                    else{
                        files.push(file);
                    }

                }
            }
            else{
                this.setState({
                    message: "Can't Upload More Than 1 File.",
                    variant: "error",
                    snackbar: true,
                })
            }
        }
        
        var no_files = 0;
        no_files = files.length;

        this.setState({
            attachments: files,
            noOfFiles: no_files,
        })

        console.log(this.state.formData);
    };

    
    closeSnackBar = (event, response) => {
        this.setState({
            snackbar: false,
        })
    }

    async loadData(){
        
        var user = AuthService.getUserData();
        var id = user.userData.id;
        var conferenceOne;
        var conferenceArr = [];
        var data = this.state.formData;

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

        data['user'] = id;

        this.setState({
            conferences: conferenceArr,
            formData:data,
        })
        // console.log(this.state)
    }

    componentDidMount(){

        //load data
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
                <Grid container>

                    { this.state.isLargeScreen && 
                        <Grid item xs={12} md={6}>
                            <img src={researchImage} alt="" width="100%" height="550"/>
                        </Grid>
                    }

                    <Grid item xs={12} md={6}>
                        
                        <Typography variant="h4" className="pt-5 text-center">
                            Create Research
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
                                    <Autocomplete
                                        className="mt-4 mb-3"
                                        fullWidth
                                        options={this.state.conferences}
                                        getOptionLabel={(opt) => opt.title}
                                        name="conference"
                                        size='small'
                                        // value={{value: this.state.formData.conference}}
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

                                {/* Upload File */}
                                <Grid item xs={12} md={12} className={classes.inputElement}>
                                    <input
                                        id="contained-button-file"
                                        size='small'
                                        name="attachments"
                                        multiple
                                        type="file"
                                        onChange={this.handleFileUpload}
                                        style={{ display:"none"}}
                                    />

                                    <label htmlFor="contained-button-file">
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            startIcon={<CloudUploadIcon/>}
                                            component="span"
                                        >
                                            Upload
                                            &ensp;
                                            { "Files Chosen: "+this.state.noOfFiles }
                                        </Button>
                                    </label>
                                </Grid>

                                <Grid item xs={12} md={12}>
                                    <div className="text-center my-3">
                                        <Button variant="contained" color="primary" type="submit">
                                            Create
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

                    <Snackbar open={this.state.snackbar}  autoHideDuration={2500} onClose={this.closeSnackBar} name="snackBar">
                        <Alert severity={this.state.variant} onClose={this.closeSnackBar} >{this.state.message}</Alert>
                    </Snackbar>

                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(CreateResearch);

