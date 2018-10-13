import React, {Component} from 'react';
import * as firebase from 'firebase';
import {connect} from 'react-redux';

import * as actions from '../../store/actions/index';
import Donor from '../../components/Donor/Donor';
import './Donors.css';

// Material UI Imports start
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// Material UI Imports end

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    width: "280px",
    marginTop : "20px",
    marginBottom : "20px" 
  }
});

class Donors extends Component{

  state = {
    bloodGroup : '',
    donors : []
  }

  componentDidMount(){
    firebase.database()
      .ref('donors/')
      .orderByChild('available')
      .equalTo(true)
      .on('value', snap => {
        const donorsObj = snap.val();
        const donors = [];
          for(let donor in donorsObj){
            if(donorsObj[donor].available)
              donors.push({id : donor, ...donorsObj[donor]})
          }
          this.props.onSetDonors(donors);
          this.handleChange(this.state.bloodGroup);
      })
  }

  handleChange = bloodGroup => {
    this.setState({ bloodGroup});
    let donors = [];
    if(bloodGroup === "AB+"){
      donors = [...this.props.donors]
    }
    else if(bloodGroup === "AB-"){
      donors = this.props.donors.filter(donor => {
        return donor.bloodGroup === "A-" || donor.bloodGroup === "B-" || donor.bloodGroup === "O-" || donor.bloodGroup === "AB-" 
      })
    }
    else if(bloodGroup === "A+"){
      donors = this.props.donors.filter(donor => {
        return donor.bloodGroup === "O+" || donor.bloodGroup === "O-" || donor.bloodGroup === "A+" || donor.bloodGroup === "A-" 
      })
    }
    else if(bloodGroup === "A-"){
      donors = this.props.donors.filter(donor => {
        return donor.bloodGroup === "O-" || donor.bloodGroup === "A-" 
      })
    }
    else if(bloodGroup === "B+"){
      donors = this.props.donors.filter(donor => {
        return donor.bloodGroup === "O+" || donor.bloodGroup === "O-" || donor.bloodGroup === "B+" || donor.bloodGroup === "B-" 
      })
    }
    else if(bloodGroup === "B-"){
      donors = this.props.donors.filter(donor => {
        return donor.bloodGroup === "O-" || donor.bloodGroup === "B-" 
      })
    }
    else if(bloodGroup === 'O+'){
      donors = this.props.donors.filter(donor => {
        return donor.bloodGroup === "O-" || donor.bloodGroup === "O+" 
      })
    }
    else if(bloodGroup === 'O-'){
      donors = this.props.donors.filter(donor => {
        return donor.bloodGroup === "O-"
      })
    }
    this.setState({donors})
  };

  render(){
      let donors = ''
      if(this.state.bloodGroup === '')
        donors = <p>Select a Blood Group To Continue</p>
      else if(this.state.donors.length <= 0)  
        donors = <p>Sorry, No Donors are Available for the Selected Blood Group</p>
      else{
        donors = this.state.donors.map(donor => {
          return(
            <Donor
              key = {donor.name} 
              name = {donor.name}
              age = {donor.age}
              area = {donor.area}
              bloodGroup = {donor.bloodGroup}
              gender = {donor.gender}
              phone = {donor.phone}/>
          )
        })
      }
      
      return(
        <div>
          <FormControl className={this.props.classes.formControl}>
            <InputLabel htmlFor="age-simple">Blood Group</InputLabel>
            <Select
              value={this.state.bloodGroup}
              onChange={(event) => this.handleChange(event.target.value)}
              inputProps={{
              name: 'bloodGroup',
              id: 'bloodGroup',
            }}>
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value={"A+"}>A+</MenuItem>
              <MenuItem value={"A-"}>A-</MenuItem>
              <MenuItem value={"B+"}>B+</MenuItem>
              <MenuItem value={"B-"}>B-</MenuItem>
              <MenuItem value={"AB+"}>AB+</MenuItem>
              <MenuItem value={"AB-"}>AB-</MenuItem>
              <MenuItem value={"O+"}>O+</MenuItem>
              <MenuItem value={"O-"}>O-</MenuItem>
            </Select>
          </FormControl>
          <div className = "Donors">
          {donors}
          </div>
      </div>      
      )
  }
}

const mapStateToProps = state => {
  return{
    donors : state.donors.donors
  }
}

const mapDispatchToProps = dispatch => {
  return{
    onSetDonors : (donors) => dispatch(actions.setDonors(donors))     
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Donors));