import axios from 'axios';
import React, { Component } from 'react'

class UserServices extends Component {
    
    userLogin = async(data) =>{
        
        const pr = new Promise((resolve, reject) => {
            axios.post('URL', data)
            .then(res => {

                if(res.status == 200){
                    if(res.data.success){
                        return resolve(res);
                    }
                    else{
                        return reject(res)
                    }
                }
                else{
                    return reject(res)
                }

            })
            .catch(error => {
                console.log(error);
                return reject(error)
            })
        })

        return await pr;

    }

}

export default new UserServices;
