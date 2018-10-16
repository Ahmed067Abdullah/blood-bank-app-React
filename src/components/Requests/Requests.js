import React, {Component} from 'react';
import Requester from './Requester/Requester';
import * as firebase from 'firebase';

class Requests extends Component{
    
    state = {
        requesters : []
    }

    componentDidMount(){
        const requests = this.props.requests;
        let requesters = []
        for(let i = 0 ; i < requests.length ; i++){
            firebase.database().ref(`/donors/${requests[i]}`).on('value', snapshot => {
                 requesters.push({id : requests[i], ...snapshot.val()});
            })
        }
        this.setState({requesters})
    }
    
    render(){
        return(
            <div>
            {this.state.requesters.map((request) => {
                return (
                    <Requester
                        key = {request.id} 
                        name = {request.name}
                        area = {request.area}
                        disabled = {false}
                        clicked = {() => this.props.clicked(request.id)}
                        phone = {request.phone} />)
                })}
            </div>
        )
    }
}

export default Requests;