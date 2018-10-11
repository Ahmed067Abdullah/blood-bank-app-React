import React from 'react';

// Material UI Imports start
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// Material UI Imports end

const styles = theme => ({
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    alignLeft : {
        color : "#af111c"
    }
  });

const donor = (props) => {
    return(
        <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={props.classes.heading}><strong style= {{color : "#404952"}}>{props.name} ({props.bloodGroup})</strong></Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography align = "left" className = {props.classes.alignLeft}>
            Gender : {props.gender}<br/> 
            Age : {props.age}<br/>
            Phone : {props.phone} <br/>
            Area : {props.area}
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
}

export default withStyles(styles)(donor);