import React, {Component} from 'react';
import * as firebase from 'firebase';
import {connect} from 'react-redux';

import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import Requests from '../../components/Requests/Requests';
import Notifications from '../../components/Notifications/Notifications';
import RegisterDonor from '../../components/RegisterDonor/RegisterDonor'
import './Profile.css';

class Profile extends Component{
    state = {
        phone : '',
        age : '',
        area : '',
        bloodGroup : 'A+',
        name : '',
        gender : 'male',
        available : true,
        loading : false,
        error : null,
        requesters : [],
        confirmedRequests : [],
        notifications : []
    }

    componentDidMount() {
        if(this.props.isDonor){
            
            // Fetching donor data
            firebase.database()
                .ref(`donors/${this.props.uid}`)
                .once('value')
                .then(snapshot =>{
                    const snapshotObj = snapshot.val();
                    this.setState({
                        name : snapshotObj.name,
                        age :  snapshotObj.age,
                        area :  snapshotObj.area,
                        phone : snapshotObj.phone,
                        gender : snapshotObj.gender,
                        bloodGroup : snapshotObj.bloodGroup,
                        available : snapshotObj.available
                    })
                })
            
            // fetching donation requests and pushing them in their respective type
            firebase.database()
                .ref(`requests`)
                .orderByChild('to')
                .equalTo(this.props.uid)
                .on('value', snapshot => {
                    const retObj = snapshot.val();
                    let requests = [];
                    let confirmedRequests = [];
                    for(let requester in retObj){
                        if(retObj[requester].status === '0' || retObj[requester].status === 0)
                            requests.push({id :requester, ...retObj[requester]})
                        else if(retObj[requester].status === '1' || retObj[requester].status === 1)
                            confirmedRequests.push({id :requester, ...retObj[requester]})
                    }

                    // fetching donor details who asked for donation and pushing then in requestersData
                    let requestersData = [];
                    for(let i = 0 ; i < requests.length ; i++){
                        firebase.database()
                            .ref(`/donors/${requests[i].from}`)
                            .on('value', ss => {
                                let retVal = ss.val()
                                requestersData.push({
                                    reqId : requests[i].id, 
                                    id :requests[i].from, 
                                    name : retVal.name, 
                                    phone : retVal.phone, 
                                    area : retVal.area});
                        })
                    } 

                    // fetching donor details whom you have donated and pushing then in confirmedRequestersData                    
                    let confirmedRequestersData = [];
                    for(let i = 0 ; i < confirmedRequests.length ; i++){
                        firebase.database()
                            .ref(`/donors/${confirmedRequests[i].from}`)
                            .on('value', ss => {
                                let retVal = ss.val()
                                confirmedRequestersData.push({
                                    reqId : confirmedRequests[i].id, 
                                    id :confirmedRequests[i].from, 
                                    name : retVal.name, 
                                    phone : retVal.phone, 
                                    area : retVal.area});
                        })
                    }
                    this.setState({requesters : requestersData, confirmedRequests : confirmedRequestersData})
            })
        
        // fetching your donation requests, checking if they are confirmed and pushing them in confirmedRequests             
        firebase.database()
            .ref(`requests`)
            .orderByChild('from')
            .equalTo(this.props.uid)
            .on('value', snapshot => {
                const retObj = snapshot.val();

                let confirmedRequests = [];
                for(let requester in retObj){
                    if(retObj[requester].status === '1' || retObj[requester].status === 1)
                        confirmedRequests.push({id :requester, ...retObj[requester]})
                }
                
                // fetching donor details who have donated to you and pushing then in confirmedRequestersData                   
                let confirmedRequestersData = [];
                for(let i = 0 ; i < confirmedRequests.length ; i++){
                    firebase.database()
                        .ref(`/donors/${confirmedRequests[i].to}`)
                        .on('value', ss => {
                            let retVal = ss.val()
                            confirmedRequestersData.push({
                                reqId : confirmedRequests[i].id, 
                                id :confirmedRequests[i].to, 
                                name : retVal.name, 
                                phone : retVal.phone, 
                                area : retVal.area});
                    })
                }
                this.setState({notifications : confirmedRequestersData})
            })
        }
    }

    // Form control functions start
    handleChange = (event) => {
        this.setState({ [event.target.name] : event.target.value });
    }

    switchAvailability = name => event => {
        this.setState({ [name]: event.target.checked });
      };

    handleSubmit = () => {
        this.setState({loading : true});
        const {name,age,area,bloodGroup,gender,phone,available} = this.state;
        firebase.database()
            .ref(`donors/${this.props.uid}`)
            .set({
                name,
                age,
                area,
                bloodGroup,
                gender,
                phone,    
                available,
            })
        .then(res => {
            this.setState({loading : false, error : null});
            this.props.onSetRegistered();
        })
        .catch(err => {
            this.setState({loading : false, error : err});
        })
    }
    // Form control functions end

    // Donation requests functions start
    confirmedHandler = (id,reqId) => {
        let updatedObj = {};
        updatedObj[`requests/${reqId}/status`] = 1; 
        firebase.database().ref().update(updatedObj)

        updatedObj = {};
        updatedObj[`donors/${reqId}/donatedAt`] = new Date() .getTime();
        firebase.database().ref().update(updatedObj)
    }
 
    canceledHandler = (id,reqId) => {
        let updatedObj = {};
        updatedObj[`requests/${reqId}/status`] = 2; 
        firebase.database().ref().update(updatedObj)
    }
    // Donation requests functions end
    
    render(){
        return(
            <div  className = "main">
                {this.state.loading ? 
                    <Spinner/> : 
                    
                    <div className = "content-container">
                        <div className = "requests">
                            <Requests 
                                requests  ={this.state.requesters} 
                                confirmedRequests = {this.state.confirmedRequests}
                                confirmed = {this.confirmedHandler} 
                                canceled = {this.canceledHandler}/>                
                        </div>   

                        <div className = "register-form">
                            <RegisterDonor
                                name = {this.state.name}
                                age = {this.state.age}
                                area = {this.state.area}
                                gender = {this.state.gender}
                                bloodGroup = {this.state.bloodGroup}
                                phone = {this.state.phone}
                                available = {this.state.available}
                                error = {this.state.error}
                                isDonor = {this.props.isDonor}
                                handleSubmit = {this.handleSubmit}
                                switchAvailability = {this.switchAvailability}
                                handleChange = {this.handleChange}/>
                        </div>

                        <div className = "notifications">
                            <Notifications notifications  ={this.state.notifications}/>               
                        </div>      
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        uid : state.auth.uid,
        isDonor : state.auth.isDonor
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onSetRegistered : () => dispatch(actions.registeredDonor())        
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile);