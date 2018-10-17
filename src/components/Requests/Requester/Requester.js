import React from 'react';

import Aux from '../../../hoc/Auxiliary/Auxiliary';

// Material UI Imports start
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
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
          <Typography className={props.classes.heading}><strong style= {{color : "#404952"}}>{props.name}</strong></Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography align = "left" className = {props.classes.alignLeft}>
            Phone : {props.phone} <br/>
            Area : {props.area}<br/>

            {props.showButtons ?
              <Aux>
                <Button 
                  type="submit" 
                  variant="contained" 
                  color="secondary"
                  disabled = {props.disabled}
                  onClick = {props.confirmed}
                  className = "req-btn">Confirm</Button>
                <Button 
                  type="submit" 
                  variant="contained" 
                  color="secondary"
                  disabled = {props.disabled}
                  onClick = {props.canceled}
                  className = "req-btn">Cancel</Button>
              </Aux> :
            null}
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
}

export default withStyles(styles)(donor);