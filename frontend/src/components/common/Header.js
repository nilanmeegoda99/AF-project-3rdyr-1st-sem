import React, {Component} from 'react';

import AuthService from '../../services/AuthService';

import AdminHeader from './AdminHeader';
import UserHeader from './UserHeader';

class Header extends Component {

    constructor(props){
        super(props);
        this.state = {
            user:{
                authorized: false,
                isAdmin: false,
                user_type: null,
            }
        }
        this.state.user = this.props.user;
        // console.log("Header data", this.props)
    }

    render() {
        return (
            <>
                {   
                    this.state.user.isAdmin == false ?

                    <UserHeader user={this.state.user}/>
                    :
                    <AdminHeader user={this.state.user}/>
                }
            </>
        );
    }
}

export default Header;