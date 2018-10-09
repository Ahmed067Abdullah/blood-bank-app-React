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

const styles = theme => {
    return {
        TextFields : {
            marginBottom : "10px",
            marginTop : "10px",
            width : "280px"
        }, 
        formControl: {
            width: "280px",
        },
        LastTextField : {
            marginBottom : "10px",
            marginTop : "-10px",
            width : "280px"
        },
    }
}

class RegisterDonor extends Component{
    state = {
        phone : '',
        age : '',
        area : '',
        bloodGroup : '',
        name : '',
        gender : 'male'
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
    }
    handleChange = (event) => {
        this.setState({ [event.target.name] : event.target.value });
    }
 
    handleSubmit = () => {
        // your submit logic
    }
    render(){
        return(
            <div  className = "Main">
            <Card>
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
                {/* <FormControl component="fieldset" className={this.props.classes.formControl}> */}
                    {/* <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup
                        aria-label="Gender"
                        name="gender"
                        className={this.props.classes.group}
                        value={this.state.gender}
                        onChange={this.handleChange}
                    >
                        <FormControlLabel value="female" control={<Radio />} label="Female"/>
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                    </RadioGroup> */}
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
                <Button type="submit">Submit</Button>
            </ValidatorForm>
            </Card>
            </div>
        )
    }
}

export default withStyles(styles)(RegisterDonor);