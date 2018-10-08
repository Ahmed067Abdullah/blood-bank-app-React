import React, {Component} from 'react';

import Navbar from '.././../components/UI/Navbar/Navbar';
// import Auth from '../../containers/Auth/Auth';
import RegisterDonor from '../../containers/RegisterDonor/RegisterDonor';
import Aux from '../../hoc/Auxiliary/Auxiliary';

class Layout extends Component{
    render(){
        return(
            <Aux>
                <Navbar/>
                <RegisterDonor/>
                {/* <Auth/> */}
            </Aux>    
        )
    }
}

export default Layout;