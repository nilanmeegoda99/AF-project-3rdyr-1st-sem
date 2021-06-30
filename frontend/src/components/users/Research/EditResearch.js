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
import axios from 'axios';

const styles = theme =>({

    inputElement:{
        paddingLeft: 15,
        paddingRight: 15,
        // minWidth: '360px',
    },
    formGrid: {
        paddingLeft: 160,
        paddingRight: 160,
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
    },
    conferences: [],
    
};
class EditResearch extends Component {

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

        axios.put('http://localhost:5000/api/researches/'+this.state.id, this.state.formData)
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

    async loadData(id){
        
        var wId = id;
        var data = {};

        await axios.get('http://localhost:5000/api/researches/'+wId)
        .then(res => {
            console.log(res);
            if(res.status == 200){
                if(res.data.success){
                    data = res.data.research;
                }
            }
        })
        .catch(error => {
            console.log("Error:",error)
        })

        this.setState({
            id: wId,
            formData: data,
        })

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

        window.location.href = "/researches";
    }

    setSelectedValue = (name, value) => {

        var data = this.state.formData;
        data[name] = value;

        this.setState({
            formData: data,
        })

        // console.log(this.state);

    }

    componentDidMount(){

        //load data from db
        var id = this.props.match.params.id;
        this.loadData(id);

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
                            Edit Research
                        </Typography>

                        {/* Loading */}
                        { this.state.loading != false && 
                            <div className="mt-4">
                                <Loader/>
                            </div>
                        }
                        <ValidatorForm onSubmit={this.fromSubmit}>

                            <Grid container className={ this.state.isLargeScreen ? classes.formGrid : "px-3 py-3"}>
                                
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

                                <Grid item xs={12} md className={classes.inputElement}>
                                    <Alert severity="info">You Can't Update Attachments and Conference.</Alert>
                                </Grid>

                                <Grid item xs={12} md={12}>
                                    <div className="text-center my-3">
                                        <Button variant="contained" color="primary" type="submit">
                                            Update
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

export default withStyles(styles)(EditResearch);
