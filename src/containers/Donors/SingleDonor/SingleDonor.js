import React, {Component} from 'react';

class SingleDonor extends Component{
    render(){
        return(
            <p>Single Donor, id {this.props.match.params.id}</p>
        )
    }
}

export default SingleDonor;