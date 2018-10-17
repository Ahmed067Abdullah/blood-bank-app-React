import React from 'react';

import Card from '../../hoc/Card/Card';
import Requester from '../Requests/Requester/Requester';

const requests = (props) =>{
    console.log(props)
    return(
        <Card>
            <h2 className = "h2 heading font-weight-bold req-heading">Notifications</h2>            
            {props.notifications && props.notifications.length > 0 ?
                props.notifications.map((notification) => {
                    return (
                        <Requester
                            key = {notification.id} 
                            name = {notification.name + " has accepted your donation request"}
                            area = {notification.area}
                            phone = {notification.phone} />)
                }) : <p>No Notifications Found</p>}
        </Card>
    )
}

export default requests;