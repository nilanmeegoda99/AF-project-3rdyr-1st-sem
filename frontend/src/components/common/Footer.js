import React, {Component} from 'react';
import { Container, Row, Col } from "react-bootstrap";

class Footer extends Component {
    render() {
        return (
            <footer>
                <Row>
                    <Col className='text-center py-3' style={{ backgroundColor:'#000', color: '#fff' }}>
                        Copyright @ 2021S1_REG_WE_38
                    </Col>
                </Row>
            </footer>
        );
    }
}

export default Footer;