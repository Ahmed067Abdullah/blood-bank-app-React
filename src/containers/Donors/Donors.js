import React, {Component} from 'react';
import * as firebase from 'firebase';
import {connect} from 'react-redux';

import * as actions from '../../store/actions/index';
import Donor from '../../components/Donor/Donor';
import BloodPic from '../../components/BloodPic/BloodPic';
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
    donors : [],
    possibleGroups : ''
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
    let possibleGroups = '';
    if(bloodGroup === "AB+"){
      donors = [...this.props.donors];
      possibleGroups = 'all';
    }
    else if(bloodGroup === "AB-"){
      donors = this.props.donors.filter(donor => {
        return donor.bloodGroup === "A-" || donor.bloodGroup === "B-" || donor.bloodGroup === "O-" || donor.bloodGroup === "AB-" 
      })
      possibleGroups = 'AB-, A-, B- and O-';
    }
    else if(bloodGroup === "A+"){
      donors = this.props.donors.filter(donor => {
        return donor.bloodGroup === "O+" || donor.bloodGroup === "O-" || donor.bloodGroup === "A+" || donor.bloodGroup === "A-" 
      })
      possibleGroups = 'A+, A-, O+ and O-';
    }
    else if(bloodGroup === "A-"){
      donors = this.props.donors.filter(donor => {
        return donor.bloodGroup === "O-" || donor.bloodGroup === "A-" 
      })
      possibleGroups = 'A- and O-';
    }
    else if(bloodGroup === "B+"){
      donors = this.props.donors.filter(donor => {
        return donor.bloodGroup === "O+" || donor.bloodGroup === "O-" || donor.bloodGroup === "B+" || donor.bloodGroup === "B-" 
      })
      possibleGroups = 'B+, B-, O+ and O-';
    }
    else if(bloodGroup === "B-"){
      donors = this.props.donors.filter(donor => {
        return donor.bloodGroup === "O-" || donor.bloodGroup === "B-" 
      })
      possibleGroups = 'B- and O-';
    }
    else if(bloodGroup === 'O+'){
      donors = this.props.donors.filter(donor => {
        return donor.bloodGroup === "O-" || donor.bloodGroup === "O+" 
      })
      possibleGroups = 'O+ and O-';
    }
    else if(bloodGroup === 'O-'){
      donors = this.props.donors.filter(donor => {
        return donor.bloodGroup === "O-"
      })
      possibleGroups = 'O-';
    }
    this.setState({donors, possibleGroups})
  };

  clickedHandler = (id) => {

    let requestedDonor = this.state.donors.find((donor) => {
      return donor.id === id
    });
    if(!requestedDonor.requestedBy)
      requestedDonor.requestedBy = [];
    requestedDonor.requestedBy.push(this.props.uid);

    firebase.database().ref(`donors/${id}/`).update({
      requestedBy : requestedDonor.requestedBy
    })
  }

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
              key = {donor.id} 
              name = {donor.name}
              age = {donor.age}
              area = {donor.area}
              bloodGroup = {donor.bloodGroup}
              gender = {donor.gender}
              disabled = {!this.props.isDonor}
              clicked = {() => this.clickedHandler(donor.id)}
              phone = {donor.phone}/>
          )
        })
      }
      
      return(
        <div className = "main-container">
          <div className = "left">
              <BloodPic/>
          </div>
          <div className = "center">
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
            {this.state.bloodGroup ? <p className = "Error">{this.state.bloodGroup} can recieve blood from {this.state.possibleGroups} group{this.state.bloodGroup !== 'O-' ? "s" : null}</p> : null}
            <div className = "Donors">
            {donors}
            </div>
          </div>
          <div className = "right">
            <BloodPic/>
          </div>
      </div>      
      )
  }
}

const mapStateToProps = state => {
  return{
    donors : state.donors.donors,
    uid : state.auth.uid,
    isDonor : state.auth.isDonor
  }
}

const mapDispatchToProps = dispatch => {
  return{
    onSetDonors : (donors) => dispatch(actions.setDonors(donors))     
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Donors));