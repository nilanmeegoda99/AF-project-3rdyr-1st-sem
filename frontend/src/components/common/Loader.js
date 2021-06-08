import React, { Component } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';

export default class Loader extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                <CircularProgress 
                    animation='border' 
                    role='status' 
                    style={{ width: '100px', height: '100px', margin: 'auto', display:'block' }}>
                        <span className='sr-only'>Loading...</span>
                </CircularProgress>
            </div>
        )
    }
}
