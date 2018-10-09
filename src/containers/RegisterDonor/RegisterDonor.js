import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { withStyles } from "@material-ui/core/styles";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Card from '../../hoc/Card/Card';
import './RegisterDonor.css';
import Radio from '@material-ui/core/Radio';
import FormLabel from '@material-ui/core/FormLabel';
import * as firebase from 'firebase';
import Spinner from '../../components/UI/Spinner/Spinner';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

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
                    this.setState({
                        name : snapshot.val().name,
                        age :  snapshot.val().age,
                        area :  snapshot.val().area,
                        phone : snapshot.val().phone,
                        gender : snapshot.val().gender,
                        bloodGroup : snapshot.val().bloodGroup
                    })
                })
        }
    }
    handleChange = (event) => {
        this.setState({ [event.target.name] : event.target.value });
    }
 
    handleSubmit = () => {
        this.setState({loading : true});
        const database = firebase.database();
        const {name,age,area,bloodGroup,gender,phone} = this.state;
        database.ref(`donors/${this.props.uid}`).set({
            name,
            age,
            area,
            bloodGroup,
            gender,
            phone,    
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
            <div  className = "Main">
            {this.state.loading ? <Spinner/> : 
            <Card>
            <p className = "Error">{this.state.error ? this.state.error  : null}</p>                
            <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
                onError={errors => console.log(errors)}
            >
                <TextValidator
                    className = {this.props.classes.TextFields}
                    label="Name"
                    onChange={this.handleChange}
                    name="name"
                    value={this.state.name}
                    validators={['required','isSmallEnough']}
                    errorMessages={['This field is required', 'Maximum 255 Characters are allowed']}
                /><br/>
                <FormControl className={this.props.classes.formControl}>
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
                    label="Area"
                    onChange={this.handleChange}
                    name="area"
                    value={this.state.area}
                    validators={['required','isSmallEnough']}
                    errorMessages={['This field is required', 'Maximum 255 Characters are allowed']}
                /><br/>
                <TextValidator
                    className = {this.props.classes.TextFields}
                    label="Phone Number"
                    onChange={this.handleChange}
                    name="phone"
                    value={this.state.phone}
                    validators={['required','matchRegexp:^[0-9]*$','isElevenDigits']}
                    errorMessages={['This field is required', 'Invalid Phone Number','Phone Number must have 11 digits']}
                /><br/><br/>
                    <FormLabel component="legend">Gender</FormLabel>
                    <label><Radio
                        checked={this.state.gender === 'male'}
                        onChange={this.handleChange}
                        value="male"
                        name="gender"
                    />Male</label>
                    <label><Radio
                    checked={this.state.gender === 'female'}
                    onChange={this.handleChange}
                    value="female"
                    name="gender"
                    />Female</label>
                {/* </FormControl> */}
                    <TextValidator
                    className = {this.props.classes.LastTextField}
                    label="Age"
                    onChange={this.handleChange}
                    name="age"
                    value={this.state.age}
                    validators={['required', 'isOldEnough','matchRegexp:^[0-9]*$']}
                    errorMessages={['This field is required', 'You are not old enough to donate','Invalid Age']}
                /><br/>
                <Button type="submit">{this.props.isDonor ? "Update" : "Register"}</Button>
            </ValidatorForm>
            </Card>}
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