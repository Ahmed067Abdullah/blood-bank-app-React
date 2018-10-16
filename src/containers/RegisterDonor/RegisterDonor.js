import React, {Component} from 'react';
import * as firebase from 'firebase';
import {connect} from 'react-redux';

import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import Card from '../../hoc/Card/Card';
import Requests from '../../components/Requests/Requests';
import './RegisterDonor.css';

// Material UI Imports start
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { withStyles } from "@material-ui/core/styles";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '../../components/UI/Forms/FormControlLabel/FormControlLabel';
import Switch from "@material-ui/core/Switch";
// Material UI Imports ens

const styles = theme => {
    return {
        TextFields : {
            marginBottom : "10px",
            marginTop : "10px",
            width : "95%"
        }, 
        formControl: {
            width: "95%",
        },
        LastTextField : {
            marginBottom : "10px",
            marginTop : "-10px",
            width : "95%"
        },
    }
}

class RegisterDonor extends Component{
    state = {
        phone : '',
        age : '',
        area : '',
        bloodGroup : 'A+',
        name : '',
        gender : 'male',
        requestedBy : null,
        available : true,
        loading : false,
        error : null
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('isOldEnough', (value) => {
            if (value.trim() < 18) {
                return false;
            }
            return true;
        });

        ValidatorForm.addValidationRule('isSmallEnough', (value) => {
            if (value.trim().length >= 256) {
                return false;
            }
            return true;
        });

        ValidatorForm.addValidationRule('isElevenDigits', (value) => {
            if (value.trim().length < 11 || value.trim().length > 11  ) {
                return false;
            }
            return true;
        });

        if(this.props.isDonor){
            firebase.database().ref(`donors/${this.props.uid}`).once('value')
                .then(snapshot =>{
                    const snapshotObj = snapshot.val();
                    this.setState({
                        name : snapshotObj.name,
                        age :  snapshotObj.age,
                        area :  snapshotObj.area,
                        phone : snapshotObj.phone,
                        gender : snapshotObj.gender,
                        bloodGroup : snapshotObj.bloodGroup,
                        available : snapshotObj.available,
                        requestedBy : snapshotObj.requestedBy
                    })
                })
        }
    }
    handleChange = (event) => {
        this.setState({ [event.target.name] : event.target.value });
    }

    switchAvailability = name => event => {
        this.setState({ [name]: event.target.checked });
      };

    clickedHandler = (id) => {
        console.log(id);
    }
 
    handleSubmit = () => {
        this.setState({loading : true});
        const database = firebase.database();
        const {name,age,area,bloodGroup,gender,phone,available,requestedBy} = this.state;
        database.ref(`donors/${this.props.uid}`).set({
            name,
            age,
            area,
            bloodGroup,
            gender,
            phone,    
            available,
            requestedBy
        })
        .then(res => {
            this.setState({loading : false, error : null});
            this.props.onSetRegistered();
        })
        .catch(err => {
            this.setState({loading : false, error : err});
        })
    }
    render(){
        return(
            <div  className = "main">
            {this.state.loading ? <Spinner/> : 
            <div className = "content-container">
            <div className = "requests">
                <Card>
                    <h1 className = "h2 heading font-weight-bold">Donation Requests</h1>
                    {(!this.props.isDonor || (this.props.isDonor && !this.state.requestedBy)) ?  
                        <p>No Requests Found</p> : 
                        <Requests requests  ={this.state.requestedBy} clicked = {this.clickedHandler}/>}                
                </Card>
            </div>            
            <div className = "register-form">
                <div className = "form-container">
            <Card>
                <h1 className = "h2 heading font-weight-bold">Register as Donor</h1>
                <p className = "Error">{this.state.error ? this.state.error  : null}</p>                
                <ValidatorForm
                    ref="form"
                    onSubmit={this.handleSubmit}
                    onError={errors => console.log(errors)}>
                    
                    <TextValidator
                        className = {this.props.classes.TextFields}
                        label="Name"
                        onChange={this.handleChange}
                        name="name"
                        value={this.state.name}
                        validators={['required','isSmallEnough']}
                        errorMessages={['This field is required', 'Maximum 255 Characters are allowed']}/><br/>
                    
                    <TextValidator
                        className = {this.props.classes.TextFields}
                        label="Age"
                        onChange={this.handleChange}
                        name="age"
                        value={this.state.age}
                        validators={['required', 'isOldEnough','matchRegexp:^[0-9]*$']}
                        errorMessages={['This field is required', 'You are not old enough to donate','Invalid Age']}/><br/><br/>
                    
                    <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup
                        aria-label="Gender"
                        name="gender"
                        value={this.state.gender}
                        onChange={this.handleChange}>
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                    </RadioGroup>

                    <FormControl className={this.props.classes.TextFields}>
                        <InputLabel htmlFor="bg">Blood Group</InputLabel>
                        <Select
                            value={this.state.bloodGroup}
                            onChange={this.handleChange}
                            inputProps={{
                                name: 'bloodGroup',
                                id: 'bg',
                            }}>
                            <MenuItem value={"A+"}>A+</MenuItem>
                            <MenuItem value={"A-"}>A-</MenuItem>
                            <MenuItem value={"B+"}>B+</MenuItem>
                            <MenuItem value={"B-"}>B-</MenuItem>
                            <MenuItem value={"AB+"}>AB+</MenuItem>
                            <MenuItem value={"AB-"}>AB-</MenuItem>
                            <MenuItem value={"O+"}>O+</MenuItem>
                            <MenuItem value={"O-"}>O-</MenuItem>
                        </Select>
                    </FormControl><br/>
                    
                    <TextValidator
                        className = {this.props.classes.TextFields}
                        label="Phone Number"
                        onChange={this.handleChange}
                        name="phone"
                        value={this.state.phone}
                        validators={['required','matchRegexp:^[0-9]*$','isElevenDigits']}
                        errorMessages={['This field is required', 'Invalid Phone Number','Phone Number must have 11 digits']}/><br/>

                    <TextValidator
                        className = {this.props.classes.TextFields}
                        label="Area"
                        onChange={this.handleChange}
                        name="area"
                        value={this.state.area}
                        validators={['required','isSmallEnough']}
                        errorMessages={['This field is required', 'Maximum 255 Characters are allowed']}/><br/>
                    
                    <FormControlLabel
                        control={<Switch
                                    checked={this.state.available}
                                    onChange={this.switchAvailability('available')}
                                    value="available"/>}
                        label="Available"
                        labelPlacement = "start"/><br/>

                    <Button 
                        variant="contained" 
                        color="secondary" 
                        type="submit">{this.props.isDonor ? "Update" : "Register"}</Button>
                </ValidatorForm>
            </Card>
            </div>
            </div>
            </div>}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        uid : state.auth.uid,
        isDonor : state.auth.isDonor
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onSetRegistered : () => dispatch(actions.registeredDonor())        
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(RegisterDonor));