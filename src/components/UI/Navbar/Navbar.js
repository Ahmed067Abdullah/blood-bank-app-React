import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import StyledTabs from './Tabs/Tabs';
import Tab from "@material-ui/core/Tab";
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
// import BloodPic from '../../../assets/blood-drop.jpg';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  own: {
    background: "#af111c",
  },
});

class Navbar extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  buttonClickedHandler = (path) => {
      this.props.history.push(path);
  }
  render() {
    const { classes } = this.props;
    const { value } = this.state;

    let authButtonValue = '';
    let authButtonPath = '/auth';
    if(this.props.isAuth){
      authButtonPath = "/logout"
      authButtonValue = "Logout"
    }
    else  if(this.props.isSignup)
      authButtonValue = "Sign up"
    else
      authButtonValue = "Sign in";

    let registerButtonValue = "Register as Donor";
    if(this.props.isDonor)
      registerButtonValue = "Update Profile"

    return (
      <div className={classes.root}>
       {this.props.isAuth ? 
        <AppBar position="static" className={classes.own}>
          <StyledTabs centered value={value} onChange={this.handleChange} >
            <Tab label="Donors" onClick ={() => this.buttonClickedHandler("/donors")} />
            <Tab label={registerButtonValue} onClick ={() => this.buttonClickedHandler("/registerDonor")}/>
            <Tab label={authButtonValue} onClick ={() => this.buttonClickedHandler(authButtonPath)}/>
          </StyledTabs>
        </AppBar>
        : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
    return{
      isSignup : state.auth.isSignup,
      isAuth : state.auth.isAuth,
      isDonor : state.auth.isDonor
    }
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Navbar)));
