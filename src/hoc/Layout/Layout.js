import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';

import Navbar from '.././../components/UI/Navbar/Navbar';
import Auth from '../../containers/Auth/Auth';
import RegisterDonor from '../../containers/RegisterDonor/RegisterDonor';
import Donors from '../../containers/Donors/Donors';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Logout from '../../containers/Auth/Logout/Logout';
import SingleDonor from '../../containers/Donors/SingleDonor/SingleDonor';

class Layout extends Component{
    render(){
        return(
            <Aux>
                <Navbar/>
                <Switch>
                    <Route path = "/registerDonor" component = {RegisterDonor}/>
                    <Route path = "/auth" component = {Auth}/>
                    <Route path = "/donors" component = {Donors}/>
                    <Route path = "/logout" component = {Logout}/>
                    <Route path = "/" exact component = {Auth}/>
                    <Route path = "/:id" component = {SingleDonor}/>
                </Switch>
            </Aux>    
        )
    }
}

export default Layout;