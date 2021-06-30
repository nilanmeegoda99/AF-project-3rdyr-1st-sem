import React, {Component} from 'react';

class Footer extends Component {
    render() {
        return (
            <footer className="bg-dark text-center text-lg-start">
                <div className='text-center py-3' 
                    style={{ 
                            // backgroundColor:'#343A40', 
                            color: '#ffffff80',
                            // bottom: 0,
                            // position: 'relative',
                            // width:'100%', 
                        }}
                    >
                    Copyright @ 2021S1_REG_WE_38
                </div>
            </footer>
        );
    }
}

export default Footer;