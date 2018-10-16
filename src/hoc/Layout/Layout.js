import React, {Component} from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import Navbar from '.././../components/UI/Navbar/Navbar';
import Aux from '../../hoc/Auxiliary/Auxiliary';

// Containers to be rendered using routing
import Auth from '../../containers/Auth/Auth';
import RegisterDonor from '../../containers/RegisterDonor/RegisterDonor';
import Donors from '../../containers/Donors/Donors';
import Logout from '../../containers/Auth/Logout/Logout';

class Layout extends Component{
    render(){
        let routes = (
            <Switch>
                <Route path = "/auth" component = {Auth}/>
                <Route path = "/" exact component = {Auth}/>
                <Route path = "/donors" component = {Donors}/>
                <Redirect to = "/"/>
            </Switch>            
        )
        if(this.props.isAuth){
            routes = (
            <Switch>
                <Route path = "/registerDonor" component = {RegisterDonor}/>
                <Route path = "/auth" component = {Auth}/>
                <Route path = "/donors" component = {Donors}/>
                <Route path = "/logout" component = {Logout}/>
                <Route path = "/" exact component = {Auth}/>
            </Switch>
            )
        }
        return(
            <Aux>
                <Navbar/>
                {routes}
            </Aux>    
        )
    }
}

const mapStateToProps = state => {
    return{
        isAuth : state.auth.isAuth 
    }
}

export default withRouter(connect(mapStateToProps)(Layout));