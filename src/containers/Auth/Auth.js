import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from "@material-ui/core/styles";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import * as firebase from 'firebase'

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
        if(this.props.isSignup){
            console.log("Signup")
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.pass)
            .then(res => {
                this.props.onLogin();
                this.props.history.replace("/donors");
            })
            .catch(error => {
                console.log(error);
                // Handle Errors here.
                // var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorMessage);

            });
        }
        else{
            console.log("Sigin")
            firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.pass)
            .then(res =>{
                this.props.onLogin();
                this.props.history.replace("/donors");
            })    
            .catch(error =>{
                console.log(error);
                // Handle Errors here.
                // var errorCode = error.code;
                // var errorMessage = error.message;
                // ...
              });
        }
    }

    switchAuthState = () => {
        if(this.props.isSignup){
            this.props.onSignin()
        }
        else{
            this.props.onSignup()
        }
    }
    render(){
        let authMessage = "Already Have an Account? ";
        let authLink = "Sign in";
        if(!this.props.isSignup){
            authMessage = "Dont Have an Account? ";
            authLink = "Sign up";
        }
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
            <p>{authMessage}<strong style = {{ textDecoration : 'underline', cursor : 'pointer'}} onClick = {this.switchAuthState}>{authLink}</strong></p>
            </Card>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        isAuth : state.auth.isAuth,
        isSignup : state.auth.isSignup
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onLogin : () => dispatch(actions.login()),
        onLogout : () => dispatch(actions.logout()),
        onSignin : () => dispatch(actions.setSignin()),
        onSignup : () => dispatch(actions.setSignup())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Auth));