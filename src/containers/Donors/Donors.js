import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import * as firebase from 'firebase';

import Donor from '../../components/Donor/Donor';

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
    let query = firebase.database().ref('donors/').orderByChild('bloodGroup')
    query.on('value', snap => {
      const donorsObj = snap.val();
      const donors = [];
        for(let donor in donorsObj){
          donors.push({id : donor, ...donorsObj[donor]})
        }
        this.setState({donors})
    })
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render(){
      return(
        <div>
          <FormControl className={this.props.classes.formControl}>
            <InputLabel htmlFor="age-simple">Blood Group</InputLabel>
            <Select
              value={this.state.bloodGroup}
              onChange={this.handleChange}
              inputProps={{
              name: 'bloodGroup',
              id: 'bloodGroup',
            }}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
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
          {this.state.donors.map(donor => {
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
          })}
      </div>      
      )
  }
}

export default withStyles(styles)(Donors);