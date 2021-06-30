import axios from 'axios';

 class AuthService{

    validateJWTToken = () => {
        console.log('Validate JWT');
        var result = this.loginWithJWTToken();

        if(result){
            return result;
        }
        else{
            return null;
        }

    }

    loginWithJWTToken = () => {

        var user_Data = this.getUserData();
        var user = null;
        
        //user logged in and validate token
        if(user_Data){
            user = user_Data.userData;
            var token = user_Data.token;
            
            // axios.post('',token)
            // .then(res => {
                var res = {
                    status:200,
                    data:{
                        success: true,
                        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlBBTUtBWUEiLCJpYXQiOjE1MTYyMzkwMjJ9.-H9NZ1JHZ4tO79UM80CmJ3dw3xj2vgsLkJpZ25bCzaw",
                        message: "Data Success",
                        data:{
                            name:'kamal',
                            email:'kamal@gmail.com',
                            id: "60d90867e53d7b1b0c2eb933",
                            isAdmin: 
                                // true,
                                false,
                            user_type: 
                            // 'Super Admin'
                            // 'Editor'
                            // 'Reviewer'
                            'Attendee'
                            // 'Researcher'
                            // 'Workshop Coordinator'
                        }
                    }
                }

                //token expired
                if(res.data.message == "Expired"){
                    this.userLogout();
                    return null;
                }
                else{ 
                    //token not expired set data agin to prevent local storage changes
                    user = res.data.data;
                    var token = res.data.token;
                    this.setUserDataToLocal(user, token);
                }
            // })
            // .catch(error => {
            //     console.log('Error',error);
            // })
        }
        else{
            //user not logged in
            return null;
        }

        return user;
    }
    
    //set local data to local storage
    setUserDataToLocal = (data, token) => {
        localStorage.setItem('user_info', JSON.stringify(data));
        localStorage.setItem('token', token);
        return true;
    }

    //get user data from local storage
    getUserData = () => {
        var userToken = localStorage.getItem('token');
        var u_data = localStorage.getItem('user_info');

        if(userToken && u_data){
            var userData = JSON.parse(u_data);
            return {userToken, userData};
        }
        else{
            return null;
        }
    }

    //remove user data from local storage - logout
    userLogout = () => {
        localStorage.removeItem('user_info');
        localStorage.removeItem('token');
    }

}

export default new AuthService();