import React, {Component} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


class Donors extends Component{
    clickedHandler = () => {
        this.props.history.push("/4");
    }
    render(){
        return(
            <List component="nav">
                <ListItem button onClick = {this.clickedHandler}>
                    <ListItemText primary="Ahmed" />
                </ListItem>
                <ListItem button component="a" onClick = {this.clickedHandler}>
                    <ListItemText primary="Bilal" />
                </ListItem>
          </List>
        )
    }
}

export default Donors;