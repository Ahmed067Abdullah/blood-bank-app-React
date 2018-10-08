import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import StyledTabs from './Tabs/Tabs';
import Tab from "@material-ui/core/Tab";
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

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
       
        <AppBar position="static" className={classes.own}>
          <StyledTabs centered value={value} onChange={this.handleChange} >
            <Tab label="Donors" />
            <Tab label="Register as Donor" />
            <Tab label="Logout" href="#basic-tabs" />
          </StyledTabs>
        </AppBar>
      </div>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Navbar);
