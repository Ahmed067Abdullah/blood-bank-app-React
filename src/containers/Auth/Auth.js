import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from "@material-ui/core/styles";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Card from '../../components/UI/Card/Card';
import './Auth.css';

const styles = theme => {
    return {
        TextFields : {
            marginBottom : "20px",
            width : "280px"
        }
    }
}

class Auth extends Component{
    state = {
        email: '',
        pass : ''
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('isLongEnough', (value) => {
            if (value.trim().length < 6) {
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
                    label="Email"
                    onChange={this.handleChange}
                    name="email"
                    value={this.state.email}
                    validators={['required', 'isEmail']}
                    errorMessages={['This field is required', 'Invalid Email']}
                /><br/>
                <TextValidator
                    className = {this.props.classes.TextFields}
                    label="Password"
                    onChange={this.handleChange}
                    name="pass"
                    value={this.state.pass}
                    validators={['required', 'isLongEnough']}
                    errorMessages={['This field is required', 'Password must be longer than 6 characters']}
                /><br/>
                <Button type="submit">Submit</Button>
            </ValidatorForm>
            </Card>
            </div>
        )
    }
}

export default withStyles(styles)(Auth);